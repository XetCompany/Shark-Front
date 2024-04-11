import { makeAutoObservable } from "mobx";
import CommonApi from "@/api/CommonApi.js";

class AppStore {
  cities = [];
  categories = [];

  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  init() {
    setTimeout(() => {
      this.updateCities();
      this.updateCategories();
    });
  }

  getCityNameById(id) {
    const city = this.cities.find((city) => city.id === id);
    return city ? city.name : "";
  }

  getCategoryNameById(id) {
    const category = this.categories.find((category) => category.id === id);
    return category ? category.name : "";
  }

  async updateCities() {
    const response = await CommonApi.getCities();
    this.setCities(response.data);
  }

  async updateCategories() {
    const response = await CommonApi.getCategories();
    this.setCategories(response.data);
  }

  setCities(cities) {
    this.cities = cities;
  }

  setCategories(categories) {
    this.categories = categories;
  }
}

export const appStore = new AppStore();
