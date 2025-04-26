"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateDoc } from "../../actions/documents";
import { toast } from "../../hooks/use-toast";
import constants from "../../utils/constants";
import Input from "../Input";
import SubmitButton from "../SubmitButton";

const Title = ({ title: initialValue, documentId }: { title: string; documentId: string }) => {
  const router = useRouter();

  const [title, setTitle] = useState(initialValue);
  const [editTitle, setEditTitle] = useState(false);
  const [pendingTitle, startTransitionTitle] = useTransition();

  const updateTitleAction = () => {
    startTransitionTitle(async () => {
      try {
        const { message, status } = await updateDoc({ documentId: documentId, title });

        if (status === constants("STATUS_ERROR")) {
          throw new Error(message);
        }

        router.refresh();
        setEditTitle(false);
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
    <div className="relative">
      {editTitle ? (
        <>
          <form action={updateTitleAction}>
            <Input
              defaultValue={title}
              className="text-2xl font-bold !min-w-1/2"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2">
              <SubmitButton
                isLoading={pendingTitle}
                className="!w-fit bg-transparent hover:bg-transparent ring-blue-500 ring text-blue-500 text-sm transition-all font-normal !py-0 rounded-lg h-7"
              >
                {pendingTitle ? <>Saving</> : <>Save</>}
              </SubmitButton>
              <button
                type="button"
                className="size-7 ring-blue-500 ring text-blue-500 flex justify-center items-center py-1 px-3 text-sm cursor-pointer rounded-lg hover:ring-red-500 hover:text-red-500 transition-colors"
                onClick={() => setEditTitle((prev) => !prev)}
              >
                X
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1 className="py-3 text-2xl font-bold">{title}</h1>
          <button
            type="button"
            className="absolute -right-8 top-3 font-medium text-sm inline-block cursor-pointer"
            onClick={() => setEditTitle((prev) => !prev)}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Title;
