export type TodoType = {
  id: number;
  completed: boolean;
  content: string;
  order: number;
  goal_id?: number;
  created_at?: Date;
  step?: number;
  uid?: string;
};

type BaseUpdatePayload<K extends keyof Omit<TodoType, "id">> = {
  id: number;
} & Pick<TodoType, K>;

export type UpdateCompletePayload = BaseUpdatePayload<"completed">;
export type UpdateContentPayload = BaseUpdatePayload<"content">;
export type UpdateOrderPayload = BaseUpdatePayload<"order" | "step">;
