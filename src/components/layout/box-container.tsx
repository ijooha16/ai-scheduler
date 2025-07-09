import { ContainerType } from "@/types/layout.type";
import React from "react";

const BoxContainer = ({ children, className, style }: ContainerType) => {
  return (
    <div
      className={`${className} flex flex-col rounded-2xl px-8 py-6`}
      style={style}
    >
      {children}
    </div>
  );
};

export default BoxContainer;
