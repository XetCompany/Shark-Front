import { FC, ReactNode } from "react";
import { classNames } from "@common/classNames.ts";
import "./Button.css";

interface IButton {
  onClick?: (e: never) => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
}

export const Button: FC<IButton> = ({
  onClick,
  disabled = false,
  children,
  className = "",
  type = "button",
}) => {
  return (
    <button
      className={classNames({
        [className]: !!className,
        button: true,
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
