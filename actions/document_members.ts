"use server";

import { getUserSession } from "@/actions/auth";
import constants from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { DocumentMember, ROLE_TYPE } from "../types/document_members";

export async function addMembers(members: Pick<DocumentMember, "document_id" | "role" | "user_id">[]) {
  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from(constants("TABLE_DOCUMENT_MEMBERS_NAME")).insert(members);

  if (error) {
    if (error.code === "23505") {
      return { status: constants("STATUS_ERROR"), message: "User is already a member of the document" };
    }

    if (error.code === "42501") {
      return {
        status: constants("STATUS_ERROR"),
        message: "You don't have permission to add members to this document.",
      };
    }

    return { status: constants("STATUS_ERROR"), message: error.message };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
  };
}

export async function changeRole(member_id: string, role: ROLE_TYPE) {
  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
    };
  }

  const supabase = await createClient();

  const { error, data } = await supabase
    .from(constants("TABLE_DOCUMENT_MEMBERS_NAME"))
    .update({ role: role })
    .eq("id", member_id)
    .select("*")
    .single();

  if (error || !data) {
    return { status: constants("STATUS_ERROR"), message: error?.message || "Something went wrong when change role" };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
  };
}

export async function deleteMember(member_id: string) {
  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
    };
  }

  const supabase = await createClient();

  const { error, data } = await supabase
    .from(constants("TABLE_DOCUMENT_MEMBERS_NAME"))
    .delete()
    .eq("id", member_id)
    .select("*")
    .single();

  if (error || !data) {
    return { status: constants("STATUS_ERROR"), message: error?.message || "Something went wrong when change role" };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
  };
}
