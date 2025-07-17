"use client";

import { signOut } from "@/services/auth";
import useAuthStore from "@/stores/use-auth-store";
import { useGetUserQuery } from "@/tanstack/queries/get-user-query";
import Button from "../common/button";
import Link from "next/link";

const Header = () => {
  const { userId, logout } = useAuthStore();
  const { data } = useGetUserQuery(userId);

  const onClickHandler = () => {
    signOut();
    logout();
  };

  return (
    <div className="fixed top-0 z-90 flex h-16 w-full items-center justify-between bg-white/50 px-8 backdrop-blur-[15px]">
      <Link href="/">Logo</Link>
      {data ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Button onClick={() => onClickHandler()}>
            {data.nickname}로그아웃
          </Button>
        </>
      ) : (
        <Link href="/login">
          <Button>로그인</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
