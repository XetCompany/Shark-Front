import { makeAutoObservable } from "mobx";
import CommonApi from "@/api/CommonApi.js";

class AppStore {
  cities = [];
  citiesIsLoading = false;

  categories = [];
  categoriesIsLoading = false;

  errorMessage = null;

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

  async updateCities() {
    this.setCitiesIsLoading(true);
    const response = await CommonApi.getCities();
    this.setCities(response.data);
    this.setCitiesIsLoading(false);
  }

  setCities(cities) {
    this.cities = cities;
  }

  setCitiesIsLoading(isLoading) {
    this.citiesIsLoading = isLoading;
  }

  getCategoryNameById(id) {
    const category = this.categories.find((category) => category.id === id);
    return category ? category.name : "";
  }

  async updateCategories() {
    this.setCategoriesIsLoading(true);
    const response = await CommonApi.getCategories();
    this.setCategories(response.data);
    this.setCategoriesIsLoading(false);
  }

  setCategories(categories) {
    this.categories = categories;
  }

  setCategoriesIsLoading(isLoading) {
    this.categoriesIsLoading = isLoading;
  }

  setErrorMessage(message) {
    this.errorMessage = message;
  }
}

export const appStore = new AppStore();
