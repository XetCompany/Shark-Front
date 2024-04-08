import { ChangeEvent, FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { appStore } from "@store/AppStore/AppStore.ts";
import { TResetInput } from "../../types/user.ts";
import { Input } from "@components/Input/Input.tsx";
import { Button } from "@components/Button/Button.tsx";
import "./ResetPassword.css";

export const ResetPassword: FC = observer(() => {
  const [resetInput, setResetInput] = useState<TResetInput>({
    email: "",
  });
  const [haveForm, setHaveForm] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, "name");
    setResetInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginClick = (e: { preventDefault: () => void }) => {
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
