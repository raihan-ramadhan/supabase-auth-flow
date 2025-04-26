import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { changeRole } from "../../actions/document_members";
import { toast } from "../../hooks/use-toast";
import { ROLE_TYPE } from "../../types/document_members";
import constants from "../../utils/constants";
import { handleError } from "../../utils/error";
import Loader from "../Loader"; // adjust path if needed

const SelectRole = ({
  value,
  onChange,
  member_id,
}: {
  value: ROLE_TYPE;
  onChange: (role: ROLE_TYPE) => void;
  member_id: string;
}) => {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const changeRoleAction = (member_id: string, role: ROLE_TYPE) => {
    startTransition(async () => {
      try {
        const { message, status } = await changeRole(member_id, role);

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
    <div className="relative inline-block">
      <select
        value={value}
        name="roles"
        id="roles"
        className="appearance-none bg-background text-foreground px-1 py-0.5 rounded pr-6 hover:bg-neutral-100 dark:hover:bg-neutral-900"
        onChange={(e) => {
          const role = e.target.value as ROLE_TYPE;
          changeRoleAction(member_id, role);
          onChange(role);
        }}
      >
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>

      <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
        {pending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 32 32">
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M30 12L16 24L2 12"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default SelectRole;
