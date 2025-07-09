"use client";

import { signOut } from "@/services/auth";
import { useAuthStore } from "@/stores/use-auth-store";
import { useGetUserQuery } from "@/tanstack/queries/get-user";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import Button from "../common/Button";
import Link from "next/link";

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
    <div className="fixed top-0 z-90 flex h-16 w-full items-center justify-between bg-white/50 px-8 backdrop-blur-[15px]">
      <div>Logo</div>
      {data ? (
        <Button onClick={() => signOut()}>로그아웃</Button>
      ) : (
        <Link href="/login">
          <Button>로그인</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
