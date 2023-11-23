"use client";

import { useMutation, useQueryClient } from "react-query";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import {
  deleteDocument as deleteDocument,
  updateDocument,
} from "@/server/document";

export function DeletedNoteInfo({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const restoreNote = useMutation({
    async mutationFn() {
      await updateDocument(id, {
        deleted: false,
      });
      toast({
        description: "Note restored",
      });
      router.refresh();
      queryClient.refetchQueries(["documents"]);
    },
    onError() {
      toast({ description: "Something went wrong!" });
    },
  });

  const permanentlyDeleteNote = useMutation({
    async mutationFn() {
      await deleteDocument(id);
      toast({
        description: "Note permanently deleted",
      });
      router.refresh();
    },
    onMutate() {
      queryClient.refetchQueries(["documents"]);
    },
    onError() {
      toast({ description: "Something went wrong!" });
    },
  });

  return (
    <div className="p-2 bg-destructive text-destructive-foreground">
      <div className="flex gap-4 mx-auto items-center">
        <span className="text-xs">This note is in Trash</span>
        <div className="space-x-2">
          <Button
            onClick={() => {
              restoreNote.mutate();
            }}
            variant="outline"
            size="sm"
          >
            Restore note
          </Button>
          <Button
            onClick={() => {
              permanentlyDeleteNote.mutate();
            }}
            variant="outline"
            size="sm"
          >
            Permanently delete
          </Button>
        </div>
      </div>
    </div>
  );
}
