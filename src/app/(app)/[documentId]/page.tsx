import { DeletedNoteInfo } from "@/components/deleted-note-info";
import { Editor } from "@/components/editor";
import { NoteToolbar } from "@/components/note-toolbar";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home({
  params,
}: {
  params: {
    documentId: string;
  };
}) {
  const doc = await prisma.document.findUnique({
    where: {
      id: params.documentId,
    },
  });

  if (!doc) redirect("/404");

  return (
    <div className="relative">
      {doc.deleted && <DeletedNoteInfo id={doc.id} />}
      <NoteToolbar />
      <Editor id={doc.id} title={doc.title} initialContent={doc.content} />
    </div>
  );
}
