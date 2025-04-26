import { redirect } from "next/navigation";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

import { getUserSession } from "@/actions/auth";
import Tiptap from "@/components/Editor";
import { DocumentMember } from "@/types/document_members";
import { Document } from "@/types/documents";
import { UserProfile } from "@/types/user_profiles";
import constants from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import Header from "../../../../../components/EditorDoc/Header";

export type DocMemberReqprops = Document & {
  document_members: (DocumentMember & { user_profiles: Pick<UserProfile, "avatar_url" | "email" | "display_name"> })[];
};

export default async function Page({ params }: { params: Promise<{ document_id: string }> }) {
  const { document_id } = await params;

  const session = await getUserSession();

  if (!session) {
    redirect("/sign-in");
  }

  const supabase = await createClient();

  const { error, data: doc } = (await supabase
    .from(constants("TABLE_DOCUMENTS_NAME"))
    .select(
      `*, ${constants("TABLE_DOCUMENT_MEMBERS_NAME")} (*, ${constants("TABLE_USER_PROFILES_NAME")} (display_name, email, avatar_url))`
    )
    .eq("id", document_id)
    .limit(1)
    .single()) as PostgrestSingleResponse<DocMemberReqprops>;

  if (!doc || error) return null;

  return (
    <div className="pt-[50px] min-h-screen px-5">
      <Header doc={doc} documentId={document_id} user={session.user} />
      <Tiptap doc={doc} />
    </div>
  );
}
