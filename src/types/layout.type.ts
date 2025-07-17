import { CSSProperties, ReactNode } from "react";

export type ContainerType = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};
