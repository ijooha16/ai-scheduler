"use client";

import { signOut } from "@/services/auth";
import { useAuthStore } from "@/stores/use-auth-store";
import { useGetUserQuery } from "@/tanstack/queries/get-user";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        useAuthStore.getState().login(user.id);
      }
    };

    fetchUser();
  }, []);

  const { userId } = useAuthStore();
  const { data } = useGetUserQuery(userId);

  return (
    <div>
      {data ? data.nickname : "로그인해주세요"}님 안녕하세요
      <div onClick={() => signOut()}>log out</div>
    </div>
  );
};

export default Header;
