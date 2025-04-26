"use server";

import { PostgrestSingleResponse } from "@supabase/supabase-js";

import { getUserSession } from "@/actions/auth";
import constants from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { tier_type, UserProfile, VIEW_INVITE_SAFE_USER_PROFILES } from "../types/user_profiles";

export async function getUserProfiles() {
  const session = await getUserSession();

  if (!session) {
    return {
      status: "error",
      message: "User is not authenticated",
      data: null,
    };
  }

  const supabase = await createClient();

  const { data, error } = (await supabase
    .from(constants("TABLE_USER_PROFILES_NAME"))
    .select("*")
    .eq("id", session.user.id)
    .limit(1)
    .single()) as PostgrestSingleResponse<UserProfile>;

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message, data: null };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    data: data as UserProfile,
    message: "success",
  };
}

export async function changeSubscriptionTier(tier: tier_type) {
  const session = await getUserSession();

  if (!session) {
    return {
      status: "error",
      message: "User is not authenticated",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from(constants("TABLE_USER_PROFILES_NAME"))
    .update({ tier })
    .eq("id", session.user.id);

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message, data: null };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    message: "success",
  };
}

export async function searchUser(email: string) {
  const session = await getUserSession();

  if (!session) {
    return {
      status: "error",
      message: "User is not authenticated",
      data: null,
    };
  }

  const supabase = await createClient();

  const { data, error } = (await supabase
    .from(constants("VIEW_INVITE_SAFE_USER_PROFILES"))
    .select("*")
    .ilike("email", `%${email}%`)) as PostgrestSingleResponse<VIEW_INVITE_SAFE_USER_PROFILES[]>;

  if (error) {
    return { status: constants("STATUS_ERROR"), message: error.message, data: null };
  }

  return {
    status: constants("STATUS_SUCCESS"),
    data,
    message: "success",
  };
}
