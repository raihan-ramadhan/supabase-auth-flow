"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { updateDoc } from "../actions/documents";
import { DocMemberReqprops } from "../app/(main)/(protected)/docs/[document_id]/page";
import { toast } from "../hooks/use-toast";
import constants from "../utils/constants";
import SubmitButton from "./SubmitButton";

const Editor = ({ doc }: { doc: DocMemberReqprops }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: doc.content,
    immediatelyRender: false,
  });

  const router = useRouter();
  const [pendingContent, startTransitionContent] = useTransition();

  const updateContentAction = () => {
    const content = editor?.getJSON();

    startTransitionContent(async () => {
      try {
        const { message, status } = await updateDoc({ documentId: doc.id, content });

        if (status === constants("STATUS_ERROR")) {
          throw new Error(message);
        }

        router.refresh();
      } catch (error: unknown) {
        let errorMessage;

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage || "Something went wrong.",
        });
      }
    });
  };

  return (
    <div className="mx-5 py-3 ">
      {!!editor ? (
        <EditorContent
          editor={editor}
          className="min-h-[200px] [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:p-3 [&_.ProseMirror]:focus-within:outline-none border border-border rounded-2xl my-3"
        />
      ) : (
        <div className="animate-pulse rounded-2xl my-3 h-[200px] w-full bg-neutral-200 dark:bg-neutral-800 border border-border" />
      )}
      <div className="flex">
        <form action={updateContentAction}>
          <SubmitButton isLoading={pendingContent} className="!w-[200px]">
            Saving
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default Editor;
