import { classNames } from "@common/classNames.js";
import "./Button.css";

export const Button = ({
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
