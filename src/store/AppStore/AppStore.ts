import { makeAutoObservable } from "mobx";
import {
  TData,
  TLoginData,
  TRegisterData,
  TResetInput,
} from "../../types/user.ts";
import { BASE_URL } from "../../api/constants.ts";
import { RoutesEnum } from "../../router";

export default class AppStore {
  loginData = {};
  registerData = {};
  token = "";

  resetState() {
    this.loginData = {};
    this.registerData = {};
    this.token = "";
  }

  constructor() {
    this.resetState();
    makeAutoObservable(this);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.token = token;
  }

  get getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  async setLoginData(
    data: TLoginData,
    router: {
      goTo: (arg0: RoutesEnum) => void;
    },
  ) {
    this.loginData = data;
    try {
      const response = await fetch(`${BASE_URL}auth/login/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data: TData = await response.json();
        this.setToken(data.access);
        router.goTo(RoutesEnum.HOME);
      } else {
        throw new Error("Ошибка при регистрации");
      }
    } catch (error) {
      console.error("Ошибка при обращении к серверу:", error);
    }
  }

  async setRegisterData(
    data: TRegisterData,
    router: {
      goTo: (arg0: RoutesEnum) => void;
    },
  ) {
    this.registerData = data;
    try {
      const response = await fetch(`${BASE_URL}auth/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.goTo(RoutesEnum.LOGIN);
      } else {
        throw new Error("Ошибка при регистрации");
      }
    } catch (error) {
      console.error("Ошибка при обращении к серверу:", error);
    }
  }

  async setResetPassword(data: TResetInput) {
    console.log(data);
    try {
      const response = await fetch(`${BASE_URL}auth/reset_password/request/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Request reset password success");
      } else {
        throw new Error("Ошибка при регистрации");
      }
    } catch (error) {
      console.error("Ошибка при обращении к серверу:", error);
    }
  }

  async setRequestResetPassword(data: TResetInput) {
    try {
      const response = await fetch(`${BASE_URL}auth/reset_password/reset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Пароль успешно изменен");
        return true;
      } else {
        throw new Error("Ошибка при изменении пароля");
      }
    } catch (error) {
      console.error("Ошибка при обращении к серверу:", error);
    }
  }
}

export const appStore = new AppStore();
