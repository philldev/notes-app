"use client";

import { DotsHorizontalIcon, FileIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCurrentUser } from "./auth-provider";
import { getDocuments, updateDocument } from "@/server/document";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

export function SidebarNotes() {
  const { user } = useCurrentUser();
  const params = useParams();

  const documents = useQuery({
    queryKey: [
      "documents",
      {
        userId: user.id,
      },
    ] as const,
    async queryFn({ queryKey }) {
      const data = await getDocuments({
        userId: queryKey[1].userId,
      });

      return data;
    },
  });

  const router = useRouter();

  return (
    <div>
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Notes</h2>

      {documents.data?.map((d) => (
        <Button
          key={d.id}
          variant={params.documentId === d.id ? "secondary" : "ghost"}
          className="w-full gap-2 justify-start group"
          onClick={() => {
            router.push(`/${d.id}`);
          }}
          asChild
        >
          <div>
            <span className="flex gap-1 items-center text-muted-foreground">
              <FileIcon />
            </span>
            <span className="font-semibold flex-1">
              {!d.title || d.title?.length === 0 ? "Untitled" : d.title}
            </span>
            <NoteDropdown id={d.id} />
          </div>
        </Button>
      ))}
    </div>
  );
}

function NoteDropdown({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteNote = useMutation({
    async mutationFn() {
      await updateDocument(id, {
        deleted: true,
      });
      toast({
        description: "Note deleted",
      });
      router.refresh();
    },
    onMutate() {
      queryClient.setQueriesData<Awaited<ReturnType<typeof getDocuments>>>(
        ["documents"],
        (old) => {
          if (!old) return [];

          const newData = old.filter((d) => d.id !== id);

          return newData;
        },
      );
    },
    onError() {
      toast({ description: "Something went wrong!" });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          size="icon"
          variant="ghost"
          className="w-5 h-5"
        >
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" className="w-[200px]">
        <DropdownMenuItem
          className="w-full cursor-pointer text-muted-foreground"
          onClick={() => {
            deleteNote.mutate();
          }}
        >
          <span className="flex-1">Delete</span>
          <TrashIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
