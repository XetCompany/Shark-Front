import { ChangeEvent, FC } from "react";
import { classNames } from "@common/classNames.ts";
import "./Input.css";

interface IInput {
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
}

export const Input: FC<IInput> = ({
  className = "",
  name,
  value,
  type = "text",
  onChange,
  placeholder,
}) => {
  return (
    <input
      className={classNames({
        [className]: !!className,
        input: true,
      })}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      value={value}
    />
  );
};
