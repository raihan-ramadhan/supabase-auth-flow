"use client";

import React from "react";

import { CreatedBy } from "../../types/documents";
import Avatar from "../Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropDown";
import DeleteDocButton from "./DeleteDocButton";

const MoreBtn = ({
  documentId,
  createdBy,
  isOwner,
}: {
  documentId: string;
  createdBy: CreatedBy | undefined;
  isOwner: boolean;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-border rounded-full cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 p-1 size-8">
        <svg className="size-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="#000000"
            d="M14 18a2 2 0 1 1-4 0a2 2 0 0 1 4 0m0-6a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-2-4a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
          ></path>
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>More</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isOwner ? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DeleteDocButton documentId={documentId} />
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem className="w-[150px] flex flex-col shrink-0 items-start">
          <span>Created by :</span>
          {createdBy ? (
            <div className="flex flex-start shrink-0 w-full gap-0.5">
              <Avatar
                className="!size-5"
                displayName={createdBy.display_name ?? createdBy.email ?? "Anon"}
                avatarUrl={createdBy.avatar_url ?? undefined}
              />
              <span className="line-clamp-1 w-full">{createdBy.email}</span>
            </div>
          ) : (
            <>User not found</>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreBtn;
