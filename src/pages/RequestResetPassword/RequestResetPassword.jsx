import { Input } from "@components/Input/Input.jsx";
import { Button } from "@components/Button/Button.jsx";
import { useContext, useState } from "react";
import { appStore } from "@store/AppStore/AppStore.js";
import "./RequestResetPassword.css";
import { RouterContext } from "mobx-state-router";
import { observer } from "mobx-react";

export const RequestResetPassword = observer(() => {
  const [newPassword, setNewPassword] = useState({ password: "" });
  const [passwordReseted, setPasswordReseted] = useState(false);
  const routerStore = useContext(RouterContext);
  const userId = routerStore?.routerState.params.userId ?? "";

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewPassword({ password: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: newPassword.password,
      token: userId,
    };
    (await appStore.setRequestResetPassword(data))
      ? setPasswordReseted(true)
      : setPasswordReseted(false);
    appStore.setToken(userId);
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
