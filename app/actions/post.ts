"use server";

import { createClient } from "@/lib/supabase/server";

export const createPost = async (fromData: FormData) => {
  const body = fromData.get("body") as string;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!body) {
    throw new Error("body is require");
  }

  if (!user) {
    throw new Error("unauthorized");
  }

  const { data: post, error } = await supabase.from("posts").insert({
    body: body,
    userId: user.id,
  });
};

export const updatePost = async (data: FormData) => {
  const id = data.get("id") as string;
  const body = data.get("body") as string;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!body) {
    throw new Error("body is require");
  }

  if (!user) {
    throw new Error("unauthorized");
  }

  const { data: post, error } = await supabase
    .from("posts")
    .update({
      body: body,
      userId: user.id,
    })
    .eq("id", id);
};

export const deletePost = async (id: number) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("unauthorized");
  }

  const { data: post, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);
};
