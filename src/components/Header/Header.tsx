import { FC } from "react";
import { observer } from "mobx-react";
import { appStore } from "@store/AppStore/AppStore.ts";
import SharkCatLogo from "@assets/img/SharkCatLogo.png";
import "./Header.css";

export const Header: FC = observer(() => {
  const token = localStorage.getItem("token");

  return (
    <header className="header">
      <a className="header-img" href="/">
        <img className="header-a-logo" src={SharkCatLogo} alt="SharkCatLogo" />
      </a>
      <div className="header-links">
        {!token ? (
          <>
            <a className="header-a" href="/login">
              Вход
            </a>
            <a className="header-a" href="/register">
              Регистрация
            </a>
          </>
        ) : (
          <>
            <a onClick={appStore.removeToken} className="header-a" href="/">
              Выход
            </a>
            {/*<a className="header-a" href="/register">*/}
            {/*  Регистрация*/}
            {/*</a>*/}
          </>
        )}
      </div>
    </header>
  );
});
