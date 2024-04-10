import { makeAutoObservable } from "mobx";
import { BASE_URL } from "@/api/constants.js";
import { RoutesEnum } from "../../router/index.jsx";

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
    data,
    router,
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
        const data = await response.json();
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
    data,
    router,
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

  async setResetPassword(data) {
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

  async setRequestResetPassword(data) {
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
