export type Theme = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export type Round = {
  id: number;
  data: string;
  answer: string;
  round_type_id: string;
  theme_id: string;
  created_at: string;
  updated_at: string;
};
