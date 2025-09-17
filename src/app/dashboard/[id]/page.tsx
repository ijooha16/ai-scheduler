"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import { useGetGoalByIdQuery } from "@/tanstack/queries/get-goal-query";
import useAuthStore from "@/stores/use-auth-store";
import { TodoType } from "@/types/todo.type";
import { GoalHeader } from "../_components/goal-header";
import { TodoItem } from "@/components/common/todo-item";
import { DroppableColumn } from "../_components/droppable-column";
import { SortableTodoItem } from "../_components/sortable-todo-item";
import { useUpdateTodosOrderMutation } from "@/tanstack/mutations/edit-todo-mutation";


type Columns = Record<string, TodoType[]>;

const reindex = (list: TodoType[], stepKey: string) => {
  const stepNum = Number(stepKey);
  return list.map((t, i) => ({ ...t, step: stepNum, order: i + 1 }));
};

/** 전후 배열 비교해서 변경된 {id, step, order}만 추출 */
const diffUpdates = (before: TodoType[], after: TodoType[]) => {
  const byId = new Map(before.map((t) => [String(t.id), t]));
  return after
    .filter((t) => {
      const prev = byId.get(String(t.id));
      return !prev || prev.step !== t.step || prev.order !== t.order;
    })
    .map((t) => ({ id: t.id, step: t.step as number, order: t.order as number }));
};

export default function GoalDetail() {
  const params = useParams();
  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : undefined;
  if (!id) return null;

  const goalIdNum = parseInt(id, 10);

  const { userId } = useAuthStore();
  const { data: goal } = useGetGoalByIdQuery({
    goalId: goalIdNum,
    userId,
  });
  const { data: todos } = useGetTodoQuery(goalIdNum);

  const { mutate: updateTodosOrder } = useUpdateTodosOrderMutation();

  const [columns, setColumns] = useState<Columns>({});

  useEffect(() => {
    if (todos) {
      const normalized: Columns = {};
      (Object.entries(todos as Record<string, TodoType[]>) as [string, TodoType[]][])
        .forEach(([stepKey, arr]) => {
          normalized[String(stepKey)] = arr;
        });
      setColumns(normalized);
    }
  }, [todos]);

  const steps = ['1','2','3']

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const getItemIdsForStep = (stepKey: string) =>
    (columns[stepKey] ?? []).map((t) => String(t.id));

  const findStepKeyByItemId = (itemId: string) =>
    steps.find((k) =>
      (columns[k] ?? []).some((t) => String(t.id) === itemId)
    );

  // StrictMode 중복 가드
  const lastKeyRef = useRef<string | null>(null);
  const guard = (key: string) => {
    if (lastKeyRef.current === key) return false;
    lastKeyRef.current = key;
    return true;
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    const fromStepKey = findStepKeyByItemId(activeId);
    if (!fromStepKey) return;

    setColumns((prev) => {
      const draft: Columns = { ...prev };

      let touched: { from?: string; to?: string } = {};

      if (overId.startsWith("col:")) {
        const toStepKey = overId.replace("col:", "");
        if (fromStepKey === toStepKey) return prev;

        const fromArr = [...(draft[fromStepKey] ?? [])];
        const movingIdx = fromArr.findIndex((t) => String(t.id) === activeId);
        if (movingIdx < 0) return prev;

        const moving = fromArr[movingIdx];
        fromArr.splice(movingIdx, 1);
        draft[fromStepKey] = fromArr;

        const toArr = [...(draft[toStepKey] ?? [])];
        toArr.push({ ...moving, step: Number(toStepKey) });
        draft[toStepKey] = toArr;

        touched = { from: fromStepKey, to: toStepKey };
      } else {
        const toStepKey = findStepKeyByItemId(overId);
        if (!toStepKey) return prev;

        if (toStepKey === fromStepKey) {
          const list = [...(draft[fromStepKey] ?? [])];
          const oldIndex = list.findIndex((t) => String(t.id) === activeId);
          const newIndex = list.findIndex((t) => String(t.id) === overId);
          if (oldIndex < 0 || newIndex < 0) return prev;

          draft[fromStepKey] = arrayMove(list, oldIndex, newIndex);
          touched = { from: fromStepKey }; // 같은 컬럼만 영향
        } else {
          const fromArr = [...(draft[fromStepKey] ?? [])];
          const toArr = [...(draft[toStepKey] ?? [])];
          const movingIndex = fromArr.findIndex((t) => String(t.id) === activeId);
          const overIndex = toArr.findIndex((t) => String(t.id) === overId);
          if (movingIndex < 0 || overIndex < 0) return prev;

          const moving = fromArr[movingIndex];
          fromArr.splice(movingIndex, 1);
          toArr.splice(overIndex, 0, { ...moving, step: Number(toStepKey) });

          draft[fromStepKey] = fromArr;
          draft[toStepKey] = toArr;

          touched = { from: fromStepKey, to: toStepKey };
        }
      }

      const beforeFrom = prev[touched.from!] ?? [];
      const beforeTo = touched.to ? (prev[touched.to] ?? []) : undefined;

      if (touched.from) draft[touched.from] = reindex(draft[touched.from] ?? [], touched.from);
      if (touched.to) draft[touched.to] = reindex(draft[touched.to] ?? [], touched.to);

      const afterFrom = draft[touched.from!] ?? [];
      const afterTo = touched.to ? (draft[touched.to] ?? []) : undefined;

      const updates = [
        ...diffUpdates(beforeFrom, afterFrom),
        ...(touched.to && beforeTo && afterTo ? diffUpdates(beforeTo, afterTo) : []),
      ];

      // StrictMode에서 동일 updates 중복 호출 방지
      const guardKey = JSON.stringify(updates);
      if (updates.length && guard(guardKey)) {
        updateTodosOrder({ goalId: goalIdNum, updates });
      }

      return { ...draft };
    });
  };

  return (
    <>
      {goal ? <GoalHeader goal={goal} /> : <div>불러오는중...</div>}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <div className="flex flex-col">
          {steps.map((stepKey) => {
            const list = columns[stepKey] ?? [];
            const itemIds = getItemIdsForStep(stepKey);

            return (
              <DroppableColumn key={stepKey} step={stepKey}>
                <h2 className="mb-2 text-xl font-semibold">Step {Number(stepKey)}</h2>
                <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
                  <ul className="flex flex-col gap-2">
                    {list.map((todo) => (
                      <SortableTodoItem key={String(todo.id)} id={String(todo.id)}>
                        <TodoItem todo={todo} />
                      </SortableTodoItem>
                    ))}
                  </ul>
                </SortableContext>
              </DroppableColumn>
            );
          })}
        </div>
      </DndContext>
    </>
  );
}