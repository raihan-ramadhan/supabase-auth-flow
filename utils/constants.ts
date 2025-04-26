const obj = {
  IS_EMAIL_EXIST_FUNCTION__NAME: `is_email_exist`,
  TABLE_USER_PROFILES_NAME: `user_profiles`,
  TABLE_DOCUMENTS_NAME: `documents`,
  TABLE_DOCUMENT_MEMBERS_NAME: `document_members`,
  VIEW_INVITE_SAFE_USER_PROFILES: `invite_safe_user_profiles`,
  STATUS_SUCCESS: "success",
  STATUS_ERROR: "error",
  STATUS_TIER_LIMIT_REACHED: "tier-limit-reached",
} as const;

export default function constants(objKey: keyof typeof obj) {
  return obj[objKey];
}
