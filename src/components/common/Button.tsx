import styled from "@emotion/styled";
import { ReactNode } from "react";

const Button = ({
  bg = "normal",
  children,
  onClick,
  className,
}: ButtonType) => {
  return (
    <StyledButton
      className={`${className} h-8 cursor-pointer rounded-md px-3 font-semibold`}
      onClick={onClick}
      $bg={bg}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

type ButtonType = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  bg?: "gradient" | "normal";
};

const StyledButton = styled.button<{ $bg: string }>`
  transition: 0.5s;
  background-size: 200% auto;
  box-shadow: 0 0 20px #eee;
  display: block;

  ${({ $bg }) =>
    $bg === "gradient" &&
    `
      color: white;
      background-image: linear-gradient(to right, var(--color-secondary-300) 0%, var(--color-primary-300) 51%, var(--color-secondary-300) 100%);
      &:hover {
        background-position: right center;
        text-decoration: none;
      }
    `}
`;
