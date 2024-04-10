import { useState } from "react";
import { observer } from "mobx-react";
import { appStore } from "@store/AppStore/AppStore.js";
import "./Header.css";

export const Header = observer(() => {
  const token = appStore.token;
  const [showModal, setShowModal] = useState(false);

  const defaultUserImage =
    "https://cdn-icons-png.freepik.com/512/3177/3177440.png";

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header className="header ">
      <a className="header--brand" href="/about-us">
        <img
          src="https://cdn.dorik.com/661154201d6c29001119b9a0/images/SharkCat-photoaidcom-cropped-uGz5G.png"
          alt="Logo Shark Cat"
          width="70px"
        />
        <h4 className="header-brand--title">Shark Cat</h4>
      </a>
      {!!token && (
        <ul className="header-nav--links">
          <li>
            <a href="/about-us" className="header-nav--link">
              О нас
            </a>
          </li>
          <li>
            <a href="/" className="header-nav--link">
              Товары
            </a>
          </li>
          <li>
            <a href="/cart" className="header-nav--link">
              Корзина
            </a>
          </li>
          <li>
            <a href="/order/history" className="header-nav--link">
              История заказов
            </a>
          </li>
        </ul>
      )}
      <div className="header--navs">
        <ul className="header-nav--links">
          {token && (
            <li>
              <img
                src={defaultUserImage}
                alt="User"
                className="header-user-icon"
                width="40px"
                height="40px"
                onClick={toggleModal}
              />
              {showModal && (
                <div className="user-modal">
                  <span>Username: </span>
                  <span>Email: </span>
                  <span>Role: </span>
                </div>
              )}
            </li>
          )}
          <li>
            {!token ? (
              <div className="header-nav--buttons">
                <a href="/login" className="header-nav--button">
                  Войти
                </a>
                <a href="/register" className="header-nav--button">
                  Зарегистрироваться
                </a>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  onClick={appStore.removeToken}
                  className="header-nav--button"
                >
                  Выйти из аккаунта
                </a>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
});