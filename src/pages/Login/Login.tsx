import { ChangeEvent, FC, useState } from "react";
import { useRouterStore } from "mobx-state-router";
import { appStore } from "@store/AppStore/AppStore.ts";
import { Input } from "@components/Input/Input.tsx";
import { Button } from "@components/Button/Button.tsx";
import { TLoginData } from "../../types/user.ts";
import "./Login.css";

export const Login: FC = () => {
  const routerStore = useRouterStore();
  const [loginData, setLoginData] = useState<TLoginData>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    appStore.setLoginData(loginData, routerStore);
  };

  const inputsArray = [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Логин",
      value: loginData.username,
      onChange: handleInputChange,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Пароль",
      value: loginData.password,
      onChange: handleInputChange,
    },
  ];

  return (
    <div className="login">
      <h1>Вход</h1>
      <form onSubmit={handleLoginClick} className="login-form">
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
        <p>
          Забыли пароль? {""}
          <a className="login-a" href="/reset-password/request">
            Восстановить
          </a>
        </p>
        <Button type="submit">Войти</Button>
        <p>
          Нет аккаунта? {""}
          <a className="login-a" href="/register">
            Зарегистрироваться
          </a>
        </p>
      </form>
    </div>
  );
};
