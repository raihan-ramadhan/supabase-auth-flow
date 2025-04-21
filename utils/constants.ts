const obj = {
  IS_EMAIL_EXIST_FUNCTION__NAME: `is_email_exist`,
  TABLE_USER_PROFILE_NAME: `user_profiles`,
  STATUS_SUCCESS: "success",
  STATUS_ERROR: "error",
} as const;

export default function constants(objKey: keyof typeof obj) {
  return obj[objKey];
}
