import { makeAutoObservable } from "mobx";

class CustomerStore {
  customerProducts = [];
  customerProduct = {};
  customerCart = [];
  customerOrders = [];
  customerAllPaths = [];
  customerCurrentPath = {};
  customerSearchInfo = [];

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

  setCustomerOrders(orders) {
    this.customerOrders = orders;
  }

  setCustomerAllPaths(paths) {
    this.customerAllPaths = paths;
  }

  setCustomerCurrentPath(pathId) {
    this.customerCurrentPath = pathId;
  }

  setCustomerSearchInfo(searchInfo) {
    this.customerSearchInfo = searchInfo;
  }
}

export const customerStore = new CustomerStore();
