import {
  TodoType,
  UpdateCompletePayload,
  UpdateContentPayload,
  UpdateOrderPayload,
} from "@/types/todo.type";
import { createClient } from "@/utils/supabase/client";

//todo 가져오기
export const getTodo = async (goalId: number) => {
  const supabase = createClient();

  if (!goalId) return;

  try {
    const { data } = await supabase
      .from("todos")
      .select("*")
      .eq("goal_id", goalId)
      .order("order", { ascending: true });

    const groupedTodos = data?.reduce(
      (acc, cur) => {
        if (!acc[cur.step]) {
          acc[cur.step] = [];
        }
        acc[cur.step].push(cur);
        return acc;
      },
      {} as Record<string, (typeof data)[number][]>,
    );

    return groupedTodos;
  } catch (error) {
    console.log(error);
  }
};

//todo 추가

//todo 삭제
export const removeTodo = async (todoId: number) => {
  const supabase = createClient();

  if (!todoId) return;

  try {
    const { data } = await supabase
      .from("todos")
      .delete()
      .eq("id", todoId)
      .select();

    return data?.[0];
  } catch (error) {
    console.log(error);
  }
};

//todo 수정
export const editTodo = async (data: TodoType) => {
  const supabase = createClient();

  if (!data.id) return;

  try {
    await supabase
      .from("todos")
      .update({ completed: data.completed, content: data.content })
      .eq("id", data.id);
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoContent = async (data: UpdateContentPayload) => {
  const supabase = createClient();
  const { content, id } = data;

  if (!data.id) return;

  try {
    const { data } = await supabase
      .from("todos")
      .update({ content })
      .eq("id", id)
      .select();

    return data?.[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoComplete = async (data: UpdateCompletePayload) => {
  const supabase = createClient();
  const { completed, id } = data;

  if (!data.id) return;

  try {
    const { data } = await supabase
      .from("todos")
      .update({ completed })
      .eq("id", id)
      .select();

    return data?.[0];
  } catch (error) {
    console.log(error);
  }
};

export type UpdateOrderItem = { id: string | number; step: number; order: number };
export type UpdateOrderBatchPayload = { goalId: number; updates: UpdateOrderItem[] };

export const updateTodosOrder = async (
  payload: UpdateOrderBatchPayload
): Promise<TodoType[]> => {
  const supabase = createClient();
  const { goalId, updates } = payload;
  if (!updates?.length) return [];

  // (선택) 해당 goal_id에 속한 todo인지 미리 검증 – RLS 회피가 아니라,
  // 잘못된 id 업데이트 시도를 줄이기 위함
  const ids = updates.map(u => u.id);
  const { data: found, error: selErr } = await supabase
    .from("todos")
    .select("id")
    .eq("goal_id", goalId)
    .in("id", ids);

  if (selErr) throw selErr;
  const allowed = new Set((found ?? []).map(r => r.id));
  const validUpdates = updates.filter(u => allowed.has(u.id));
  if (!validUpdates.length) return [];

  // 간단 루프 UPDATE (개수가 적을 때 충분)
  const updated: any[] = [];
  for (const u of validUpdates) {
    const { data, error } = await supabase
      .from("todos")
      .update({ step: u.step, order: u.order })
      .eq("goal_id", goalId)         // 같은 목표 내에서만
      .eq("id", u.id)
      .select()
      .single();
    if (error) throw error;          // 실패 시 중단 (원하면 try/catch로 개별 무시)
    if (data) updated.push(data);
  }
  return updated as TodoType[];
};