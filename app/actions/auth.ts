"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const signIn = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (!data.url) {
    throw Error("Invalid");
  }

  redirect(data.url);
};
export const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
};
