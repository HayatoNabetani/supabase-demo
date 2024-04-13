import "server-only";

import { createClient } from "@/lib/supabase/server";

export const getPosts = async () => {
  const supabase = createClient();

  const { data: posts, error } = await supabase.from("posts").select();

  return posts;
};
