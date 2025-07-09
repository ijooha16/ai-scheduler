import styled from "@emotion/styled";
import { ReactNode } from "react";

const Button = ({
  type = "button",
  disabled = false,
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
      disabled={disabled}
      type={type}
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
  disabled?: boolean;
  type?: "button" | "submit";
};

const StyledButton = styled.button<{ $bg: string; disabled: boolean }>`
  transition: 0.5s;
  background-size: 200% auto;
  box-shadow: 0 0 20px #eee;
  display: block;

  ${({ disabled }) =>
    disabled &&
    `
    background-color: var(--color-disabled-bg);
    color: var(--color-disabled-text);
    cursor: not-allowed;
  `}

  ${({ $bg, disabled }) =>
    $bg === "gradient" &&
    !disabled &&
    `
      color: white;
      cursor: pointer;
      background-image: linear-gradient(to right, var(--color-secondary-300) 0%, var(--color-primary-300) 51%, var(--color-secondary-300) 100%);
      &:hover {
        background-position: right center;
        text-decoration: none;
      }

    `}
`;
