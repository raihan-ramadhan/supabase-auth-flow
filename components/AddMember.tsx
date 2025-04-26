"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { addMembers } from "../actions/document_members";
import { searchUser } from "../actions/user_profiles";
import { toast } from "../hooks/use-toast";
import { DocumentMember, ROLE_TYPE } from "../types/document_members";
import { VIEW_INVITE_SAFE_USER_PROFILES } from "../types/user_profiles";
import { emailSchema } from "../utils/auth-schema";
import constants from "../utils/constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "./AlertDialog";
import Avatar from "./Avatar";
import Input from "./Input";
import Loader from "./Loader";

const AddMember = ({ documentId }: { documentId: string }) => {
  const [pendingSeacrhingEmail, startTransitionSeacrhingEmail] = useTransition();
  const [pendingAddMembers, startTransitionAddMembers] = useTransition();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const [touchedFields, setTouchedFields] = useState<Record<"email", boolean>>({ email: false });

  const validatedForm = emailSchema.safeParse({ email });

  const emailError = validatedForm?.error?.format()?.email?._errors[0];

  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState<VIEW_INVITE_SAFE_USER_PROFILES[]>([]);

  const [selectedNewMember, setSelectedNewMember] = useState<
    (VIEW_INVITE_SAFE_USER_PROFILES & { document_id: string; role: ROLE_TYPE })[]
  >([]);

  const addMemberAction = () => {
    startTransitionAddMembers(async () => {
      try {
        const payload: Pick<DocumentMember, "document_id" | "role" | "user_id">[] = selectedNewMember.map(
          ({ document_id, role, id }) => ({
            document_id,
            role,
            user_id: id,
          })
        );

        const { message, status } = await addMembers(payload);

        if (status === constants("STATUS_ERROR")) {
          throw new Error(message);
        }

        router.refresh();
        toast({
          title: "Success",
          description: message,
        });
        setOpen(false);
        setResults([]);
        setSelectedNewMember([]);
        setEmail("");
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

  const fetchEmailCheck = () => {
    startTransitionSeacrhingEmail(async () => {
      try {
        const { data, status, message } = await searchUser(email);

        if (status === constants("STATUS_ERROR") || !data) {
          throw new Error(message);
        }

        setResults((prev) => [...data, ...prev]);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    });
  };
  // debounce with 1s delay after pause type
  useEffect(() => {
    if (!emailError) {
      setIsLoading(true);
      setResults([]);
      const delay = setTimeout(() => {
        fetchEmailCheck();
      }, 300);

      return () => {
        clearTimeout(delay);
      };
    }
  }, [email, emailError, fetchEmailCheck]);

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className="size-7 rounded-full bg-blue-500 text-white flex justify-center items-center cursor-pointer"
      >
        +
      </button>

      <AlertDialog open={open} onOpenChange={handleDialogChange}>
        <AlertDialogContent>
          <AlertDialogTitle>Add a New Member</AlertDialogTitle>
          <AlertDialogDescription>Invite someone to your team by entering their email address.</AlertDialogDescription>

          <div className="flex flex-col gap-y-1.5">
            <Input
              id="email"
              name="email"
              type="email"
              maxLength={320}
              placeholder="Email Address"
              autoComplete="email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
                setTouchedFields((prev) => ({ ...prev, email: true }));
              }}
              value={email}
              disabled={pendingSeacrhingEmail}
              required
            />
            {!touchedFields.email || email.length == 0 ? null : emailError ? (
              <div className="text-sm text-red-700 flex items-center w-full gap-2 px-3 py-3 bg-neutral-100 dark:bg-neutral-900 rounded-2xl h-[48px]">
                {emailError}
              </div>
            ) : isLoading ? (
              <div className="flex items-center w-full gap-2 px-3 py-3 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl h-[48px]">
                <div className="bg-neutral-400 dark:bg-neutral-600 size-7 rounded-full animate-pulse shrink-0"></div>
                <div className="bg-neutral-400 dark:bg-neutral-600 animate-pulse w-full h-[18px] rounded-full"></div>
              </div>
            ) : results.length > 0 ? (
              results.map((res, i) => (
                <div
                  key={i}
                  className="h-[48px] bg-neutral-100 dark:bg-neutral-900 transition-colors flex items-center w-full gap-2 px-3 rounded-2xl relative"
                >
                  <Avatar displayName={res.display_name ?? res.email} avatarUrl={res.avatar_url ?? undefined} />
                  <span>{res.email}</span>
                  <button
                    onClick={() => {
                      setResults((prev) => prev.filter((obj) => obj.email !== res.email));
                      setEmail("");
                      setSelectedNewMember((prev) => [{ ...res, document_id: documentId, role: "editor" }, ...prev]);
                    }}
                    type="button"
                    className="size-7 rounded-full border border-border absolute right-3 top-1/2 -translate-y-1/2 flex justify-center items-center font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              ))
            ) : (
              <div className="h-[48px] bg-neutral-100 dark:bg-neutral-900 transition-colors flex items-center w-full gap-2 px-3 rounded-2xl relative">
                <div className="size-7 bg-neutral-100 dark:bg-neutral-900 rounded-full"></div>
                <div>User Not Found</div>
              </div>
            )}
          </div>
          <div className="border-t border-border py-2">
            <h4 className="font-bold text-lg">Selected New Member</h4>
            {selectedNewMember.map((member, i) => (
              <div
                key={i}
                className="h-[48px] bg-neutral-100 dark:bg-neutral-900 transition-colors flex items-center w-full gap-2 px-3 rounded-2xl relative"
              >
                <Avatar
                  className="shrink-0"
                  displayName={member.display_name ?? member.email}
                  avatarUrl={member.avatar_url ?? undefined}
                />
                <span className="w-full line-clamp-1">{member.email}</span>

                <select
                  value={member.role}
                  name="roles"
                  id="roles"
                  className="appearance-none bg-background text-foreground px-1 py-0.5 rounded pr-6 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  onChange={(e) => {
                    const role = e.target.value as ROLE_TYPE;
                    setSelectedNewMember((prev) => prev.map((obj) => (obj.id === member.id ? { ...obj, role } : obj)));
                  }}
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
                <button
                  className="cursor-pointer bg-background border border-border px-2 py-0.5 rounded text-sm"
                  type="button"
                  onClick={() => {
                    setSelectedNewMember((prev) => prev.filter((obj) => obj.email !== member.email));
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                type="button"
                disabled={selectedNewMember.length <= 0 || pendingAddMembers}
                onClick={(e) => {
                  e.preventDefault();
                  addMemberAction();
                }}
              >
                {pendingAddMembers ? <Loader /> : null}
                Add New Members
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddMember;
