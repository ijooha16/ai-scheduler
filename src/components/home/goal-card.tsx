import { GoalType } from "@/types/goal.type";
import BoxContainer from "../layout/box-container";
import Theme from "../common/theme";
import Button from "../common/button";

const ScheduleCard = ({
  single = false,
  data,
  onClickHandler,
}: {
  single?: boolean;
  data: GoalType;
  onClickHandler?: () => void;
}) => {
  return (
    <BoxContainer className="gap-4 bg-white">
      <div className="flex w-full items-center justify-between">
        <div className="font-semibold">{data.title}</div>
        <Theme theme={data.theme} />
      </div>
      {data.todos.map((todo, idx) => (
        <div key={todo[0]} className="flex gap-6 text-sm">
          <div className="font-bold text-gray-400">{idx + 1} 주차</div>
          <div>
            {todo.map((t) => (
              <div key={t} className="">
                {t}
              </div>
            ))}
          </div>
        </div>
      ))}
      {single ? (
        <Button>추가하기</Button>
      ) : (
        onClickHandler && (
          <Button onClick={() => onClickHandler()}>선택하기</Button>
        )
      )}
    </BoxContainer>
  );
};

export default ScheduleCard;
