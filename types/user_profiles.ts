export type tier_type = "free" | "pro" | "team" | "enterprise";

export type UserProfile = {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  first_name: string | null;
  last_name: string | null;
  tier: tier_type;
  created_at: string;
};

export type VIEW_INVITE_SAFE_USER_PROFILES = {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
};
