import { useState } from "react";
import { observer } from "mobx-react";
import "./Header.css";
import { RouterLink, useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import userStore from "@store/UserStore/UserStore.js";

export const Header = observer(() => {
  const routerStore = useRouterStore();
  const [showModal, setShowModal] = useState(false);

  const defaultUserImage =
    "https://cdn-icons-png.freepik.com/512/3177/3177440.png";

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header className="header ">
      <RouterLink className="header--brand" routeName={RoutesEnum.HOME}>
        <img
          src="https://cdn.dorik.com/661154201d6c29001119b9a0/images/SharkCat-photoaidcom-cropped-uGz5G.png"
          alt="Logo Shark Cat"
          width="70px"
        />
        <h4 className="header-brand--title">Shark Cat</h4>
      </RouterLink>
      {userStore.isLoad && (
        <ul className="header-nav--links">
          <li>
            <RouterLink
              className="header-nav--link"
              routeName={RoutesEnum.HOME}
            >О нас</RouterLink>
          </li>
          <li>
            <RouterLink
              className="header-nav--link"
              routeName={RoutesEnum.PRODUCTS}
            >Товары</RouterLink>
          </li>
          <li>
            <RouterLink
              className="header-nav--link"
              // ToDo: сделать роутинг на корзину
              routeName={RoutesEnum.PRODUCTS}
            >Корзина</RouterLink>
          </li>
          <li>
            <RouterLink
              className="header-nav--link"
              // ToDo: сделать роутинг на историю заказов
              routeName={RoutesEnum.PRODUCTS}
            >История заказов</RouterLink>
          </li>
        </ul>
      )}
      <div className="header--navs">
        <ul className="header-nav--links">
          {userStore.isLoad && (
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
            {!userStore.isLoad ? (
              <div className="header-nav--buttons">
                <RouterLink className="header-nav--button" routeName={RoutesEnum.LOGIN}>
                  Войти
                </RouterLink>
                <RouterLink className="header-nav--button" routeName={RoutesEnum.REGISTER}>
                  Зарегистрироваться
                </RouterLink>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    userStore.removeAccessToken();
                    routerStore.goTo(RoutesEnum.LOGIN);
                  }}
                  className="header-nav--button"
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
});
