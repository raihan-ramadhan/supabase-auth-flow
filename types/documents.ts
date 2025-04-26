export type Document = {
  id: string;
  title: string;
  created_by: string;
  content: object;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type CreatedBy = {
  avatar_url: string | null;
  display_name: string | null;
  email: string;
};
