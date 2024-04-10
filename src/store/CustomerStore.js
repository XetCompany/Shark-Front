import { makeAutoObservable } from "mobx";

class CustomerStore {
  resetState() {}

  constructor() {
    this.resetState();
    makeAutoObservable(this);
  }
}

export const customerStore = new CustomerStore();
