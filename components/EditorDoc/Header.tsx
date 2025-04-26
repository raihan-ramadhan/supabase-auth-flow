import React from "react";
import { User } from "@supabase/supabase-js";

import { DocMemberReqprops } from "../../app/(main)/(protected)/docs/[document_id]/page";
import { CreatedBy } from "../../types/documents";
import AddMember from "../AddMember";
import Members from "./Members";
import MoreBtn from "./MoreBtn";
import Title from "./Title";

const Header = ({ doc, documentId, user }: { doc: DocMemberReqprops; documentId: string; user: User }) => {
  const {} = doc;

  const createdBy: CreatedBy | undefined = doc.document_members.find(
    (member) => member.user_id === doc.created_by
  )?.user_profiles;

  const memberDataUser = doc.document_members.find((member) => member.user_id === user.id);

  return (
    <div className="flex items-center justify-between py-4">
      <Title title={doc.title} documentId={documentId} />
      <div className="flex items-center shrink-0 gap-2">
        {memberDataUser?.role == "admin" || memberDataUser?.role === "owner" ? (
          <AddMember documentId={documentId} />
        ) : null}

        <Members doc={doc} documentId={documentId} user={user} memberDataUser={memberDataUser} />

        <MoreBtn documentId={documentId} createdBy={createdBy} isOwner={memberDataUser?.role == "owner"} />
      </div>
    </div>
  );
};

export default Header;
