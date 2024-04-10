import { makeAutoObservable } from "mobx";

class AppStore {
  resetState() {}

  constructor() {
    this.resetState();
    makeAutoObservable(this);
  }
}

export const appStore = new AppStore();
