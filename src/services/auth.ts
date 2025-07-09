"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { randomNickname } from "@/utils/random-nickname";
import { useAuthStore } from "@/stores/use-auth-store";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: user, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }

  if (user.user) {
    redirect("/");
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        nickname: randomNickname(),
      },
    },
  };

  const { data: user, error } = await supabase.auth.signUp(data);

  if (error) {
    throw error;
  }

  if (user.user) {
    redirect("/");
  }
}

export async function signInWithKakao() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `https://oecjwvpapzsmnxhphcqd.supabase.co/auth/v1/callback`,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }

  if (error) {
    throw error;
  }

  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error Signing out", error.message);
  }

  redirect("/");
}

export const getUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user:", error.message);
    return null;
  }

  return user;
};
