import { useState } from "react";
import { Check, Edit3, Trash } from "lucide-react";
import { useEditGoalMutation } from "@/tanstack/mutations/edit-goal-mutation";
import useAuthStore from "@/stores/use-auth-store";
import { EditGoalType } from "@/types/goal.type";
import { useRemoveGoalMutation } from "@/tanstack/mutations/remove-goal-mutation";

export const GoalHeader = ({ goal }: { goal: EditGoalType }) => {
  const { id, title, theme } = goal;

  const { userId } = useAuthStore();
  const { mutate: editGoal } = useEditGoalMutation(userId);
  const { mutate: removeGoal } = useRemoveGoalMutation(userId);

  const [inputValue, setInputValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const clickEditHandler = () => {
    setIsEditing(false);
    editGoal({ id, title: inputValue, theme });
  };

  return (
    <>
      <div className="flex gap-4">
        <Edit3 size={14} onClick={() => setIsEditing(true)} />
        <Trash size={14} onClick={() => removeGoal(id)} />
      </div>
      {isEditing ? (
        <div onClick={(e) => e.preventDefault()}>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <div onClick={() => clickEditHandler()}>
            <Check size={14} />
          </div>
        </div>
      ) : (
        title
      )}
    </>
  );
};
