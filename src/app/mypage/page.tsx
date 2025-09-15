"use client";

import useAuthStore from "@/stores/use-auth-store";
import { useGetUserQuery } from "@/tanstack/queries/get-user-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MyPage = () => {
  const router = useRouter();
  const { userId } = useAuthStore();

  if (!userId) {
    router.push("/");
  }

  const { data } = useGetUserQuery(userId);
  const { email, nickname, avatar_url: image } = data;

  return (
    <div>
      {data && (
        <>
          <div>{email}</div>
          <div>{nickname}</div>
          {image && (
            <Image src={image} alt="profile image" width={40} height={40} />
          )}
        </>
      )}
    </div>
  );
};

export default MyPage;
