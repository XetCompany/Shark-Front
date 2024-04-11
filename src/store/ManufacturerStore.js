import { makeAutoObservable } from "mobx";
import PointsApi from "@/api/Manufacturer/PointsApi.js";
import MProductsApi from "@/api/Manufacturer/MProductsApi.js";

class ManufacturerStore {
  points = [];
  pointsIsLoading = false;

  products = [];
  productsIsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  init() {
    setTimeout(() => {
      this.updatePoints();
      this.updateProducts();
    });
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  getPointById(id) {
    return this.points.find((point) => point.id === id);
  }

  async updatePoints() {
    this.setPointsIsLoading(true);
    await this.loadPoints();
    this.setPointsIsLoading(false);
  }

  async loadPoints() {
    const response = await PointsApi.getPoints();
    this.setPoints(response.data);
  }

  async updateProducts() {
    this.setProductsIsLoading(true);
    await this.loadProducts();
    this.setProductsIsLoading(false);
  }

  async loadProducts() {
    const response = await MProductsApi.getProducts();
    this.setProducts(response.data);
  }

  setPointsIsLoading(value) {
    this.pointsIsLoading = value;
  }

  setPoints(points) {
    this.points = points;
  }

  setProductsIsLoading(value) {
    this.productsIsLoading = value;
  }

  setProducts(products) {
    this.products = products;
  }
}

export const manufacturerStore = new ManufacturerStore();
