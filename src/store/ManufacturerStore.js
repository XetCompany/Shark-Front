import { makeAutoObservable } from "mobx";
import PointsApi from "@/api/Manufacturer/PointsApi.js";
import MProductsApi from "@/api/Manufacturer/MProductsApi.js";
import PathsApi from "@/api/Manufacturer/PathsApi.js";

class ManufacturerStore {
  points = [];
  pointsIsLoading = false;

  products = [];
  productsIsLoading = false;

  paths = [];
  pathsIsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  init() {
    setTimeout(() => {
      this.updatePoints();
      this.updateProducts();
      this.updatePaths();
    });
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  getPointById(id) {
    return this.points.find((point) => point.id === id);
  }

  getPathById(id) {
    return this.paths.find((path) => path.id === id);
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

  async updatePaths() {
    this.setPathsIsLoading(true);
    await this.loadPaths();
    this.setPathsIsLoading(false);
  }

  async loadPaths() {
    const response = await PathsApi.getPaths();
    this.setPaths(response.data);
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

  setPathsIsLoading(value) {
    this.pathsIsLoading = value;
  }

  setPaths(paths) {
    this.paths = paths;
  }
}

export const manufacturerStore = new ManufacturerStore();
