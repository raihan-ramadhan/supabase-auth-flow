"use client";

import React, { useTransition } from "react";

import { deleteDoc } from "@/actions/documents";
import SubmitButton from "@/components/SubmitButton";
import { toast } from "@/hooks/use-toast";
import constants from "@/utils/constants";

const DeleteDocButton = ({ documentId }: { documentId: string }) => {
  const [pending, startTransition] = useTransition();

  const deleteDocAction = () => {
    startTransition(async () => {
      try {
        const { message, status } = await deleteDoc(documentId);

        if (status === constants("STATUS_ERROR")) {
          throw new Error(message);
        }

        // router.push("/dashboard");
      } catch (error) {
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
    <form action={() => deleteDocAction()} className="w-full">
      <SubmitButton
        isLoading={pending}
        className="h-fit text-foreground bg-transparent hover:bg-transparent hover:ring hover:ring-red-500 hover:text-red-600 text-sm transition-all font-normal !py-2 rounded-lg w-full !justify-start !text-left"
      >
        <span className="w-full">{pending ? <>Deleting</> : <>Delete Doc</>}</span>
      </SubmitButton>
    </form>
  );
};

export default DeleteDocButton;
