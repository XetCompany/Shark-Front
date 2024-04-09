import { ChangeEvent, FC, useState } from "react";
import { Button } from "@components/Button/Button.tsx";
import { Input } from "@components/Input/Input.tsx";
import { useRouterStore } from "mobx-state-router";
import { RoleEnum, TRegisterData } from "../../types/user.ts";
import { RoutesEnum } from "../../router";
import { appStore } from "@store/AppStore/AppStore.ts";
import "./Register.css";

export const Register: FC = () => {
  const routerStore = useRouterStore();
  const [registerData, setRegisterData] = useState<TRegisterData>({
    username: "",
    confirmPassword: "",
    password: "",
    email: "",
    role: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginClick = () => {
    routerStore.goTo(RoutesEnum.LOGIN);
  };

  const handleRegisterClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (registerData.password !== registerData.password) return;
    appStore.setRegisterData(registerData, routerStore);
  };

  const inputsArray = [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "E-mail",
      value: registerData.email,
      onChange: handleInputChange,
    },
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Логин",
      value: registerData.username,
      onChange: handleInputChange,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Пароль",
      value: registerData.password,
      onChange: handleInputChange,
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      placeholder: "Повторите пароль",
      value: registerData.confirmPassword,
      onChange: handleInputChange,
    },
  ];

  return (
    <div className="register">
      <h1>Регистрация</h1>
      <form onSubmit={handleRegisterClick} className="register-form">
        {inputsArray.map((input) => (
          <Input
            key={input.id}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange}
            required={true}
          />
        ))}
        <div className="radio">
          <label>
            <input
              type="radio"
              name="role"
              value={RoleEnum.MANUFACTURER}
              checked={registerData.role === RoleEnum.MANUFACTURER}
              onChange={handleInputChange}
              required
            />
            Я Производитель
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value={RoleEnum.CUSTOMER}
              checked={registerData.role === RoleEnum.CUSTOMER}
              onChange={handleInputChange}
              required
            />
            Я Заказчик
          </label>
        </div>
        <Button type="submit">Зарегистрироваться</Button>
        <p>
          Есть аккаунт? {""}
          <a onClick={handleLoginClick} className="register-a" href="/login">
            Войти
          </a>
        </p>
      </form>
    </div>
  );
};
