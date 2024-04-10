import { makeAutoObservable } from "mobx";

class CustomerStore {
  customerProducts = [];

  resetState() {}

  constructor() {
    this.resetState();
    makeAutoObservable(this);
  }

  setCustomerProducts(products) {
    this.customerProducts = products;
  }
}

export const customerStore = new CustomerStore();
