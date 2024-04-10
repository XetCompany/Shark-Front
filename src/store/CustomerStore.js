import { makeAutoObservable } from "mobx";

class CustomerStore {
  customerProducts = [];
  customerProduct = {};

  resetState() {}

  constructor() {
    this.resetState();
    makeAutoObservable(this);
  }

  setCustomerProducts(products) {
    this.customerProducts = products;
  }

  setCustomerProduct(product) {
    this.customerProduct = product;
  }
}

export const customerStore = new CustomerStore();
