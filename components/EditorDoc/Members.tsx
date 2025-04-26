"use client";

import React, { useState } from "react";
import { User } from "@supabase/supabase-js";

import { DocMemberReqprops } from "../../app/(main)/(protected)/docs/[document_id]/page";
import { DocumentMember } from "../../types/document_members";
import { UserProfile } from "../../types/user_profiles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../AlertDialog";
import Avatar from "../Avatar";
import RemoveMember from "./RemoveMember";
import SelectRole from "./SelectRole";

const Members = ({
  doc,
  user,
  memberDataUser,
}: {
  doc: DocMemberReqprops;
  user: User;
  memberDataUser:
    | (DocumentMember & {
        user_profiles: Pick<UserProfile, "avatar_url" | "email" | "display_name">;
      })
    | undefined;
}) => {
  const [open, setOpen] = useState(false);

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const initialValue = doc.document_members.map((member) => ({ ...member, isRemove: false }));

  const [members, setMembers] = useState<
    (DocumentMember & {
      user_profiles: Pick<UserProfile, "avatar_url" | "email" | "display_name">;
      isRemove: boolean;
    })[]
  >(initialValue);

  return (
    <AlertDialog open={open} onOpenChange={handleDialogChange}>
      <AlertDialogTrigger asChild>
        <div className="flex p-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 border rounded-full border-border cursor-pointer">
          {doc.document_members.map((member, i) => {
            const { display_name, avatar_url } = member.user_profiles;
            const email = "email" in member.user_profiles ? member.user_profiles.email : undefined;

            return (
              <div key={i} className={`dark:drop-shadow-sm dark:drop-shadow-white/50`} style={{ zIndex: i }}>
                <Avatar
                  className="!size-6"
                  displayName={display_name ?? email ?? "Anon"}
                  avatarUrl={avatar_url ?? undefined}
                  title={doc.created_by === user.id ? "You" : undefined}
                />
              </div>
            );
          })}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Manage Members</AlertDialogTitle>
        <div className="flex flex-col gap-2">
          {[
            ...members.filter((u) => u.id === memberDataUser?.id),
            ...members.filter((u) => u.id !== memberDataUser?.id),
          ].map((member, i) => {
            const { display_name, avatar_url, email } = member.user_profiles;

            return (
              <div key={i} className={`flex items-center justify-between gap-2 ${member.isRemove && "opacity-50"}`}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    className={"!size-6"}
                    displayName={display_name ?? email ?? "Anon"}
                    avatarUrl={avatar_url ?? undefined}
                    title={doc.created_by === user.id ? "You" : undefined}
                  />
                  <div>
                    {i == 0 ? <div className="text-sm font-bold">You</div> : null}
                    <div className={`line-clamp-1 shrink ${member.isRemove && "line-through"}`}>{email}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {member.role === "owner" || memberDataUser?.role === "viewer" || i == 0 ? (
                    <div className="w-[74px]">{member.role}</div>
                  ) : (
                    <SelectRole
                      value={member.role}
                      onChange={(role) => {
                        setMembers((prev) => prev.map((obj) => (obj.id === member.id ? { ...obj, role } : obj)));
                      }}
                      member_id={member.id}
                    />
                  )}
                  <RemoveMember
                    onClick={() => {
                      setMembers((prev) =>
                        prev.map((obj) => (obj.id === member.id ? { ...obj, isRemove: !obj.isRemove } : obj))
                      );
                    }}
                    memberId={member.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setMembers(initialValue);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction>Done</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Members;
