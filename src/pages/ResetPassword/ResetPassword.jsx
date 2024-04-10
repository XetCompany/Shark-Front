import { useState } from "react";
import { observer } from "mobx-react-lite";
import { appStore } from "@store/AppStore/AppStore.js";
import { Input } from "@components/Input/Input.jsx";
import { Button } from "@components/Button/Button.jsx";
import "./ResetPassword.css";

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

  const handleLoginClick = (e) => {
    e.preventDefault();
    appStore.setResetPassword(resetInput);
    setHaveForm(true);
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
