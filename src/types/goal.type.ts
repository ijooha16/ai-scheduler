export type RequestType = {
  comment: string;
  goals: GoalType[];
};

export type GoalType = {
  title: string;
  theme: ThemeType;
  todos: string[][];
  id: number;
};

export enum ThemeEnum {
  STUDY = '공부',
  EXERCISE = '운동',
  HEALTH = '건강',
  FINANCE = '재무',
  RELATIONSHIP = '관계',
  HOBBY = '취미',
  ETC = '기타',
}

export type EditGoalType = Omit<GoalType, "todos">;

export type ThemeType = keyof typeof ThemeEnum