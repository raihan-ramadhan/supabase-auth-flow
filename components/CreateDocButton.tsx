"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createDocument } from "@/actions/documents";
import SubmitButton from "@/components/SubmitButton";
import constants from "@/utils/constants";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./Dialog";

const CreateDocButton = () => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const createDoc = () => {
    startTransition(async () => {
      try {
        const { message, status, data } = await createDocument({ title: "New Document" });

        if (status === constants("STATUS_TIER_LIMIT_REACHED")) {
          setStatus(status);
          setError(message);
          setOpen(true);
          return;
        }

        if (status === constants("STATUS_ERROR") || !data) {
          throw new Error(message);
        }

        router.push(`/docs/${data.id}`);
      } catch (error) {
        let errorMessage;

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        setStatus("ERROR");
        setError(errorMessage || "Something went wrong.");
        setOpen(true);
      }
    });
  };

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    setError("");
    setStatus("");
  };

  return (
    <>
      <form action={() => createDoc()}>
        <SubmitButton isLoading={pending}>Add Document</SubmitButton>
      </form>

      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogContent>
          <DialogTitle>ERROR</DialogTitle>
          <DialogDescription>{error}</DialogDescription>
          {status === constants("STATUS_TIER_LIMIT_REACHED") ? (
            <Link
              href={"/upgrade"}
              className="bg-blue-500 p-2 rounded-2xl w-full text-background focus-visible:bg-blue-400 text-center font-bold"
            >
              Upgrade Your Tier
            </Link>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateDocButton;
