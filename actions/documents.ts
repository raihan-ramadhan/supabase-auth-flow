"use server";

import { PostgrestSingleResponse } from "@supabase/supabase-js";

import { Document } from "../types/documents";
import { tier_type } from "../types/user_profiles";
import constants from "../utils/constants";
import { createClient } from "../utils/supabase/server";
import { getUserSession } from "./auth";
import { getUserProfiles } from "./user_profiles";

const TIER_LIMITS: Record<tier_type, number | null> = {
  free: 1,
  pro: 5,
  team: 10,
  enterprise: null,
};

export const getDocumentsCount = async () => {
  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
    };
  }

  const supabase = await createClient();

  const { error, count } = (await supabase
    .from(constants("TABLE_DOCUMENTS_NAME"))
    .select("*", { count: "exact", head: true })) as PostgrestSingleResponse<number>;

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
    count,
  };
};

export const createDocument = async ({ title }: { title: string }) => {
  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
    };
  }

  const { data: profile, message, status } = await getUserProfiles();

  if (status === constants("STATUS_ERROR") || !profile) {
    return { status: constants("STATUS_ERROR"), message };
  }

  const limit = TIER_LIMITS[profile.tier];

  if (limit !== null) {
    const { count, status, message } = await getDocumentsCount();

    if (status === constants("STATUS_ERROR") || count === null || count === undefined) {
      return { status: constants("STATUS_ERROR"), message };
    }
    if (count >= limit) {
      return {
        status: constants("STATUS_TIER_LIMIT_REACHED"),
        message: `You've reached your limit of ${limit}`,
      };
    }
  }

  const supabase = await createClient();

  const { error, data } = (await supabase
    .from(constants("TABLE_DOCUMENTS_NAME"))
    .insert({ title, created_by: session.user.id })
    .select("id")
    .single()) as PostgrestSingleResponse<Pick<Document, "id">>;

  if (error) {
    return {
      status: constants("STATUS_ERROR"),
      message: error.message,
    };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
    data,
  };
};

export const getDocumentCards = async () => {
  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
      data: null,
    };
  }

  const supabase = await createClient();

  const { error, data } = (await supabase
    .from(constants("TABLE_DOCUMENTS_NAME"))
    .select("id, title, created_by")) as PostgrestSingleResponse<Pick<Document, "id" | "title" | "created_by">[]>;
  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message, data: null };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
    data,
  };
};

export const getDocuments = async () => {
  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
      data: null,
    };
  }

  const supabase = await createClient();

  const { error, data } = (await supabase
    .from(constants("TABLE_DOCUMENTS_NAME"))
    .select("*")) as PostgrestSingleResponse<Document[]>;

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message, data: null };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
    data,
  };
};

export const getDocument = async ({ documentId }: { documentId: string }) => {
  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
      data: null,
    };
  }

  const supabase = await createClient();

  const { error, data } = (await supabase
    .from(constants("TABLE_DOCUMENTS_NAME"))
    .select("*")
    .eq("id", documentId)
    .limit(1)
    .single()) as PostgrestSingleResponse<Document>;

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message, data: null };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
    data,
  };
};

export async function deleteDoc(documentId: string) {
  if (!documentId) {
    return {
      status: constants("STATUS_ERROR"),
      message: "documentId required",
    };
  }

  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from(constants("TABLE_DOCUMENTS_NAME"))
    .delete()
    .eq("id", documentId)
    .select("*")
    .single();

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
  };
}

export async function updateDoc({ documentId, title, content }: { documentId: string; title?: string; content?: {} }) {
  if (!documentId || (!title && !content)) {
    return {
      status: constants("STATUS_ERROR"),
      message: "documentId and payload required",
    };
  }

  const session = await getUserSession();

  if (!session) {
    return {
      status: constants("STATUS_ERROR"),
      message: "User is not authenticated",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from(constants("TABLE_DOCUMENTS_NAME"))
    .update({ title, content })
    .eq("id", documentId);

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
  };
}
