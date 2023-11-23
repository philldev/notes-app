"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEffect, useState } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useMutation, useQueryClient } from "react-query";
import { getDocuments, updateDocument } from "@/server/document";
import { useToast } from "./ui/use-toast";

export function Editor({
  initialContent,
  title,
  id,
}: {
  id: string;
  initialContent?: string | null;
  title?: string | null;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [_title, setTitle] = useState<string | undefined>(title ?? undefined);

  const [debouncedTitle] = useDebounce(_title, 1000);

  const updateTitle = useMutation({
    async mutationFn(data?: string | undefined) {
      if (data) await updateDocument(id, { title: data });
    },
    async onError() {
      toast({
        description: "Something went wrong!",
      });
    },
  });

  const updateContent = useMutation({
    async mutationFn(data?: string | undefined) {
      if (data) await updateDocument(id, { content: data });
    },
    async onError() {
      toast({
        description: "Something went wrong!",
      });
    },
  });

  const debouncedContent = useDebouncedCallback(
    // function
    (value: string) => {
      updateContent.mutate(value);
    },
    // delay in ms
    500,
  );

  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    onEditorContentChange: (editor) => {
      const stringify = JSON.stringify(editor.topLevelBlocks);
      if (stringify.length) {
        debouncedContent(stringify);
      }
    },
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  useEffect(() => {
    queryClient.setQueriesData<Awaited<ReturnType<typeof getDocuments>>>(
      ["documents"],
      (old) => {
        if (!old) return [];

        const newData = old.map((d) =>
          d.id === id ? { ...d, title: _title as string } : d,
        );

        return newData;
      },
    );
  }, [_title, id]);

  useEffect(() => {
    updateTitle.mutate(debouncedTitle);
  }, [debouncedTitle]);

  // Renders the editor instance using a React component.
  return (
    <div className="py-8 max-w-3xl mx-auto w-full">
      <div className="px-[54px] mb-1 mt-10">
        <input
          placeholder="Untitled"
          className="font-bold appearance-none focus-visible:outline-none tracking-tighter text-5xl"
          value={_title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <BlockNoteView editor={editor} theme="light" />
    </div>
  );
}
