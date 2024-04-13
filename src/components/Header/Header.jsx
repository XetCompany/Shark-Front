import React, { useState } from "react";
import { observer } from "mobx-react";
import { RouterLink, useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import {
  Popover,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import userStore from "@store/UserStore.js";
import "./Header.css";
import { NotificationBadge } from "@components/Common/NotificationBadge.jsx";

export const Header = observer(() => {
  const routerStore = useRouterStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    userStore.removeAuthData();
    routerStore.goTo(RoutesEnum.HOME);
    handleClose();
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
      {userStore.isLoad && !userStore.meIsManufacturer ? (
        <ul className="header-nav--links">
          <li>
            <RouterLink
              className="header-nav--link"
              routeName={RoutesEnum.HOME}
            >
              О нас
            </RouterLink>
          </li>
          <li>
            <RouterLink
              className="header-nav--link"
              routeName={RoutesEnum.PRODUCTS}
            >
              Товары
            </RouterLink>
          </li>
          <li>
            <RouterLink
              className="header-nav--link"
              routeName={RoutesEnum.CART}
            >
              Корзина
            </RouterLink>
          </li>
          <li>
            <RouterLink
              className="header-nav--link"
              routeName={RoutesEnum.ORDERS}
            >
              История заказов
            </RouterLink>
          </li>
        </ul>
      ) : (
        userStore.isLoad && (
          <ul className="header-nav--links">
            <li>
              <RouterLink
                className="header-nav--link"
                routeName={RoutesEnum.HOME}
              >
                О нас
              </RouterLink>
            </li>
            <li>
              <RouterLink
                className="header-nav--link"
                routeName={RoutesEnum.PATHS}
              >
                Маршруты
              </RouterLink>
            </li>
            <li>
              <RouterLink
                className="header-nav--link"
                routeName={RoutesEnum.M_PRODUCTS}
              >
                Каталог Товаров
              </RouterLink>
            </li>
            <li>
              <RouterLink
                className="header-nav--link"
                routeName={RoutesEnum.POINTS}
              >
                Склады и ПВЗ
              </RouterLink>
            </li>
            <li>
              <RouterLink
                className="header-nav--link"
                routeName={RoutesEnum.M_ORDERS}
              >
                Заказы
              </RouterLink>
            </li>
          </ul>
        )
      )}
      <div className="header--navs">
        <ul className="header-nav--links">
          {userStore.isLoad && (
            <li>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <NotificationBadge />
                {userStore.isLoad && (
                  <Avatar
                    src={
                      userStore.image ||
                      "https://cdn-icons-png.freepik.com/512/3177/3177440.png"
                    }
                    alt="User"
                    onClick={handleClick}
                    sx={{ cursor: "pointer", width: 40, height: 40 }}
                  />
                )}
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    {userStore.fullName ?? userStore.username}
                  </Typography>
                  <Divider />
                  <List component="nav" dense>
                    <ListItem
                      button
                      component={RouterLink}
                      routeName={RoutesEnum.PROFILE}
                    >
                      <ListItemText primary="Редактировать профиль" />
                    </ListItem>
                    <ListItem
                      button
                      component={RouterLink}
                      routeName={RoutesEnum.CHANGE_PASSWORD}
                    >
                      <ListItemText primary="Сменить пароль" />
                    </ListItem>
                    <ListItem button onClick={logout}>
                      <ListItemText primary="Выйти из аккаунта" />
                    </ListItem>
                  </List>
                </Popover>
              </div>
            </li>
          )}
          <li>
            {!userStore.isLoad && (
              <div className="header-nav--buttons">
                <RouterLink
                  className="header-nav--button"
                  routeName={RoutesEnum.LOGIN}
                >
                  Войти
                </RouterLink>
                <RouterLink
                  className="header-nav--button"
                  routeName={RoutesEnum.REGISTER}
                >
                  Зарегистрироваться
                </RouterLink>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
});
