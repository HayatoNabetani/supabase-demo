import "server-only";

import { createClient } from "@/lib/supabase/server";

export const getPost = async (id: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("id", id)
    .single();

  return data;
};

export const getPosts = async (keyword?: string) => {
  const supabase = createClient();

  let query = supabase.from("posts").select();

  if (keyword) {
    query = query.like("body", `%${keyword}%`);
  }

  const { data: posts, error } = await query;

  return posts;
};
