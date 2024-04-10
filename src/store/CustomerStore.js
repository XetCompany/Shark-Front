import { makeAutoObservable } from "mobx";

class CustomerStore {
  customerProducts = [];
  customerProduct = {};
  customerCart = [];

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

  setCustomerCart(cart) {
    this.customerCart = cart;
  }
}

export const customerStore = new CustomerStore();
