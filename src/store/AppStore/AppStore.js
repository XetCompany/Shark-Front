import { makeAutoObservable } from "mobx";
import { BASE_URL } from "@/api/constants.js";
import { RoutesEnum } from "../../router/index.jsx";

class AppStore {
  registerData = {};
  token = "";

  resetState() {
    this.registerData = {};
    this.token = "";
  }

  constructor() {
    this.resetState();
    makeAutoObservable(this);
  }

  setToken(token) {
    localStorage.setItem("accessToken", token);
    this.token = token;
  }

  removeToken() {
    localStorage.removeItem("accessToken");
    this.token = "";
  }

  async setRegisterData(data, router) {
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
