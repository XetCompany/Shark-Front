import { FC } from "react";
import { observer } from "mobx-react";
import { appStore } from "@store/AppStore/AppStore.ts";
import "./Header.css";

export const Header: FC = observer(() => {
  const token = localStorage.getItem("token");

  return (
    <div className="dorik-container-5w9x0orz  ">
      <div className="dorik-container-rjmxwfhy  ">
        <div className="dorik-navbar--wrapper dorik-nav-52icc90s-wrapper  ">
          <div className="dorik-navbar dorik-nav-52icc90s ">
            <div className="dorik-navbar--brand">
              <a href="/">
                <img
                  src="https://cdn.dorik.com/661154201d6c29001119b9a0/images/SharkCat-photoaidcom-cropped-uGz5G.png"
                  alt="Logo Caption"
                  width="70px"
                />
              </a>
            </div>
            <button
              aria-label="Navbar Toggle"
              className="dorik-navbar--toggle"
              data-target="#dorikNavbarCollapse"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bars"
                className="svg-inline--fa fa-bars fa-fw "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                ></path>
              </svg>
            </button>
            <div
              className="dorik-navbar--collapse collapse"
              id="dorikNavbarCollapse"
            >
              <div className="dorik-navbar--navs">
                <ul className="dorik-nav--links normalize">
                  <li className="">
                    <a
                      href="/"
                      className="dorik-nav--link о-нас dorik-nav--link-2suuvmpu"
                    >
                      <span className="dorik-nav--link-icon"></span>
                      <span className="dorik-nav--link-text">О нас</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="#"
                      className="dorik-nav--link услуги dorik-nav--link-jrjtnw95"
                    >
                      <span className="dorik-nav--link-icon"></span>
                      <span className="dorik-nav--link-text">Товары</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="#"
                      className="dorik-nav--link цены dorik-nav--link-3k1wquxz  "
                    >
                      <span className="dorik-nav--link-icon"></span>
                      <span className="dorik-nav--link-text">Корзина</span>
                    </a>
                  </li>
                  <li className="">
                    <a
                      href="#"
                      className="dorik-nav--link отзывы dorik-nav--link-bzdz1ay2  "
                    >
                      <span className="dorik-nav--link-icon"></span>
                      <span className="dorik-nav--link-text">
                        История заказов
                      </span>
                    </a>
                  </li>
                </ul>
                <ul className="dorik-nav--btns normalize">
                  <li>
                    {!token ? (
                      <a
                        href="/login"
                        className="dorik-nav--btn dorik-nav--btn-5xmbnhej заказать "
                      >
                        <span className="dorik-nav--btn-icon"></span>
                        <span className="dorik-nav--btn-text">Войти</span>
                      </a>
                    ) : (
                      <a
                        onClick={appStore.removeToken}
                        href="/"
                        className="dorik-nav--btn dorik-nav--btn-5xmbnhej заказать "
                      >
                        <span className="dorik-nav--btn-icon"></span>
                        <span className="dorik-nav--btn-text">
                          Выйти из аккаунта
                        </span>
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
