import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "react-query";
import { createDocument } from "@/server/document";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "./auth-provider";

export function NewNoteButton() {
  const router = useRouter();
  const { user } = useCurrentUser();

  const queryClient = useQueryClient();

  const createDoc = useMutation({
    async mutationFn(data: { userId: string }) {
      const doc = await createDocument(data);
      return doc;
    },
    async onSuccess(data) {
      await queryClient.refetchQueries();
      router.push(`/${data.id}`);
    },
  });

  return (
    <Button
      onClick={() => {
        createDoc.mutate({ userId: user.id });
      }}
      variant="secondary"
      className="w-full gap-4 justify-start"
    >
      <PlusIcon className="text-muted-foreground" />
      New Note
    </Button>
  );
}
