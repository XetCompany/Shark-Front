import { useContext, useState } from "react";
import { observer } from "mobx-react";
import { RouterContext } from "mobx-state-router";
import UserApi from "@/api/UserApi.js";
import { Input } from "@components/Input/Input.jsx";
import { Button } from "@components/Button/Button.jsx";
import "./RequestResetPassword.css";

export const RequestResetPassword = observer(() => {
  const [newPassword, setNewPassword] = useState({ password: "" });
  const [passwordReseted, setPasswordReseted] = useState(false);
  const routerStore = useContext(RouterContext);
  const paramToken = routerStore?.routerState.params.id ?? "";

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewPassword({ password: value });
  };

  const requestResetPassword = async () => {
    const data = {
      password: newPassword.password,
      token: paramToken,
    };
    try {
      await UserApi.requestResetPassword(data);
      setPasswordReseted(true);
    } catch (error) {
      setPasswordReseted(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    requestResetPassword();
  };

  return !passwordReseted ? (
    <div className="reset-password">
      <h1>Сброс пароля</h1>
      <form className="reset-form" onSubmit={onSubmit} name="basic">
        <Input
          onChange={handleInputChange}
          placeholder="Введите новый пароль"
          required={true}
          type="password"
          name="reset-password"
        />
        <Button type="submit">Отправить</Button>
      </form>
    </div>
  ) : (
    <h1>Пароль успешно изменен</h1>
  );
});
