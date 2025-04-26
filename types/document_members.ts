export type ROLE_TYPE = "owner" | "admin" | "editor" | "commenter" | "viewer";

export type DocumentMember = {
  id: string;
  document_id: string;
  user_id: string;
  role: ROLE_TYPE;
  created_at: string;
};
