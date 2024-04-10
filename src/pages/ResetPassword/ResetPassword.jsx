import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Input } from "@components/Input/Input.jsx";
import { Button } from "@components/Button/Button.jsx";
import "./ResetPassword.css";
import UserApi from "@/api/UserApi.js";

export const ResetPassword = observer(() => {
  const [resetInput, setResetInput] = useState({
    email: "",
  });
  const [haveForm, setHaveForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, "name");
    setResetInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetPassword = async () => {
    await UserApi.resetPassword(resetInput);
    setHaveForm(true);
  }

  const handleLoginClick = (e) => {
    e.preventDefault();
    resetPassword();
  };

  return !haveForm ? (
    <div className="reset-form">
      <form className="reset-form" onSubmit={handleLoginClick}>
        <h1>Восстановление данных</h1>
        <Input
          type="email"
          name="email"
          onChange={handleInputChange}
          placeholder="E-mail"
          required={true}
        />
        <Button type="submit">Отправить на почту</Button>
      </form>
    </div>
  ) : (
    <h1 className="reset-form">Запрос отправлен, проверьте почту</h1>
  );
});
