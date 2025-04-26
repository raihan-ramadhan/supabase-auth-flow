import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteMember } from "../../actions/document_members";
import { toast } from "../../hooks/use-toast";
import constants from "../../utils/constants";
import { handleError } from "../../utils/error";
import Loader from "../Loader";

const RemoveMember = ({ onClick, memberId }: { onClick: () => void; memberId: string }) => {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const changeRoleAction = (member_id: string) => {
    startTransition(async () => {
      try {
        const { message, status } = await deleteMember(member_id);

        if (status === constants("STATUS_ERROR")) {
          throw new Error(message);
        }

        toast({
          title: "Success",
          description: message,
        });
        router.refresh();
      } catch (error) {
        handleError(error);
      }
    });
  };

  return (
    <button
      type="button"
      className="cursor-pointer group"
      onClick={() => {
        onClick();
        changeRoleAction(memberId);
      }}
    >
      {pending ? (
        <Loader className="size-6" />
      ) : (
        <svg
          className="size-6 p-1 fill-foreground group-hover:fill-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M20 6h-4V5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H4a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2ZM10 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4Zm7 14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8h10Z"></path>
        </svg>
      )}
    </button>
  );
};

export default RemoveMember;
