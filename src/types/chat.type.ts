import { RequestType } from "./schedule.type";

export type ChatType = {
  type: "ai" | "user";
  content: RequestType | string;
};
