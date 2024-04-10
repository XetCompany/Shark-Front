import { makeAutoObservable } from "mobx";
import CommonApi from "@/api/CommonApi.js";

class AppStore {
  cities = [];

  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  init() {
    setTimeout(() => {
      this.updateCities();
    });
  }

  getCityNameById(id) {
    const city = this.cities.find((city) => city.id === id);
    return city ? city.name : "";
  }

  async updateCities() {
    const response = await CommonApi.getCities();
    if (response.statusText !== "OK") {
      return;
    }
    this.setCities(response.data);
  }

  setCities(cities) {
    this.cities = cities;
  }
}

export const appStore = new AppStore();
