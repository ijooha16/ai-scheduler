import { RequestType } from "./goal.type";

export type ChatType = {
  id: number;
  type: "ai" | "user";
  content: RequestType | string;
};
