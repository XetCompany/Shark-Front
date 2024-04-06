type ClassNamesArgs = string | { [s: string]: boolean };

// функция, чтобы можно было использовать несколько классов сразу
export const classNames = (...args: ClassNamesArgs[]) => {
  const classes = [];

  for (const arg of args) {
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (typeof arg === "object") {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
};
