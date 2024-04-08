import { Input } from "@components/Input/Input.tsx";
import { Button } from "@components/Button/Button.tsx";
import { ChangeEvent, useState } from "react";
import { appStore } from "@store/AppStore/AppStore.ts";
import { TResetInput } from "../../types/user.ts";
import "./RequestResetPassword.css";

export const RequestResetPassword = () => {
  const [newPassword, setNewPassword] = useState<TResetInput>({
    reset_password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    appStore.setRequestResetPassword(newPassword);
  };

  return (
    <div className="reset-password">
      <h1>Запрос на сброс пароля</h1>
      <form className="reset-form" onSubmit={onSubmit} name="basic">
        <Input
          onChange={handleInputChange}
          placeholder="Введите новый пароль"
          required={true}
        />
        <Button type="submit">Отправить</Button>
      </form>
    </div>
  );
};
