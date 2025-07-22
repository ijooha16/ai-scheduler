"use client";

import useAuthStore from "@/stores/use-auth-store";
import { useGetUserQuery } from "@/tanstack/queries/get-user-query";
import Image from "next/image";
import React from "react";

const MyPage = () => {
  const { userId } = useAuthStore();
  const { data } = useGetUserQuery(userId);
  const { email, nickname, avatar_url: image } = data;

  return (
    <div>
      {data && (
        <>
          <div>{email}</div>
          <div>{nickname}</div>
          <Image src={image} alt="profile image" width={40} height={40} />
        </>
      )}
    </div>
  );
};

export default MyPage;
