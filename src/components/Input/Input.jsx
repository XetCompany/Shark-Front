import { classNames } from "@common/classNames.js";
import "./Input.css";

export const Input = ({
  className = "",
  name,
  value,
  type = "text",
  onChange,
  placeholder,
  required,
}) => {
  return (
    <input
      className={classNames({
        [className]: !!className,
        input: true,
      })}
      type={type}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      value={value}
    />
  );
};
