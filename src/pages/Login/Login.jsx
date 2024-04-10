import { useState } from "react";
import { useRouterStore } from "mobx-state-router";
import { appStore } from "@store/AppStore/AppStore.js";
import { Input } from "@components/Input/Input.jsx";
import { Button } from "@components/Button/Button.jsx";
import "./Login.css";
import UserApi from "@/api/UserApi.js";
import { RoutesEnum } from "@/router/index.jsx";

export const Login = () => {
  const routerStore = useRouterStore();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const login = async () => {
    const response = await UserApi.login(loginData);
    if (response?.status !== 200) {
      return;
    }
    appStore.setToken(response.access);
    await routerStore.goTo(RoutesEnum.HOME);
  }

  const handleLoginClick = (e) => {
    e.preventDefault();
    login();
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
