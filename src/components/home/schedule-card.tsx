import { ScheduleType } from "@/types/schedule.type";
import React from "react";
import BoxContainer from "../layout/box-container";
import Theme from "../common/theme";

const ScheduleCard = ({ data }: { data: ScheduleType }) => {
  return (
    <BoxContainer className="gap-4 bg-white">
      <div className="flex w-full items-center justify-between">
        <div className="font-semibold">{data.title}</div>
        <Theme theme={data.theme} />
      </div>
      {data.todos.map((todo, idx) => (
        <div key={todo[0]} className="flex gap-6 text-sm">
          <div className="text-gray-400 font-bold">{idx + 1} 주차</div>
          <div>
            {todo.map((t) => (
              <div key={t} className="">{t}</div>
            ))}
          </div>
        </div>
      ))}
    </BoxContainer>
  );
};

export default ScheduleCard;
