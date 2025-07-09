import { createClient } from "@/utils/supabase/client";
import { getUser } from "./auth";

export const getUserData = async (userId: string | null) => {
  const supabase = createClient();

  if (!userId) return;

  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("uid", userId)
      .single();
    return data;
  } catch (error) {
    console.error(error);
  }
};
