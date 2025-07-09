import { ThemeType, ThemeEnum } from "@/types/schedule.type";
import React from "react";

const Theme = ({ theme }: { theme: ThemeType }) => {
  const color = {
    STUDY: "bg-[#ffdede] text-[#934848]",
    EXERCISE: "bg-[#cae5ff] text-[#284b6b]",
    HEALTH: "bg-[#cae5ff] text-[#284b6b]",
    FINANCE: "bg-[#cae5ff] text-[#284b6b]",
    RELATIONSHIP: "bg-[#cae5ff] text-[#284b6b]",
    HOBBY: "bg-[#cae5ff] text-[#284b6b]",
    ETC: "bg-[#cfffc3] text-[#3d6f30]",
  };

  return (
    <div className={`${color[theme]} rounded-md px-2 py-0.5 text-xs font-bold`}>
      {ThemeEnum[theme]}
    </div>
  );
};

export default Theme;
