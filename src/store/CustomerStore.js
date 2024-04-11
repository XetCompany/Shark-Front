import { makeAutoObservable } from "mobx";

class CustomerStore {
  customerProducts = [];
  customerProduct = {};
  customerCart = [];
  customerOrders = [];
  customerOrder = null;
  customerAllPaths = [];
  customerCurrentPath = null;
  customerSearchInfo = [];
  customerSorts = {};
  customerSelectedOrder = null;
  customerCurrentOrder = null;
  customerEvaluate = {};

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

  setCustomerCurrentOrder(currentOrder) {
    this.customerCurrentOrder = currentOrder;
  }

  setCustomerOrder(order) {
    this.customerOrder = order;
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

  setCustomerSorts(sorts) {
    this.customerSorts = sorts;
  }

  setCustomerSelectedOrder(orderId) {
    this.customerSelectedOrder = orderId;
  }

  setCustomerEvaluate(evaluate) {
    this.customerEvaluate = evaluate;
  }
}

export const customerStore = new CustomerStore();
