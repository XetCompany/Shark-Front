import { makeAutoObservable } from "mobx";
import { TLoginData, TRegisterData } from "../../types/user.ts";

export default class AppStore {
  loginData = {};
  registerData = {};
  token = false;

  resetState() {
    this.loginData = {};
    this.registerData = {};
    this.token = false;
  }

  constructor() {
    this.resetState();
    makeAutoObservable(this);
  }

  setToken(token: boolean) {
    this.token = token;
    console.log(token);
  }

  setLoginData(data: TLoginData) {
    this.loginData = data;
    console.log(data);
  }

  setRegisterData(data: TRegisterData) {
    this.registerData = data;
    console.log(data);
  }
}

export const appStore = new AppStore();
