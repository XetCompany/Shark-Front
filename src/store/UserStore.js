import { makeAutoObservable } from "mobx";
import { getAccessTokenFromLocalStorage } from "@/api/utils.js";
import UserApi from "@/api/UserApi.js";
import { ROLES } from "@common/common.js";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { NotificationsApi } from "@/api/NotificationsApi.js";

class UserStore {
  accessToken = null;

  userId = null;
  role = null;
  username = null;
  email = null;
  isLoad = false;

  notifications = [];
  timeoutUpdateNotifications = null;

  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  init() {
    this.accessToken = getAccessTokenFromLocalStorage();
    setTimeout(() => {
      this.accessToken && this.updateUser();
    });
  }

  async updateUser() {
    const response = await UserApi.getUserInfo();
    const user = response.data;
    this.updateUserData(user);

    this.onInitUser();
  }

  onInitUser() {
    if (this.meIsManufacturer) {
      manufacturerStore.init();
    }

    this.timeoutUpdateNotifications = setInterval(() => {
      this.updateNotifications();
    }, 5000);
  }

  onDestroyUser() {
    clearInterval(this.timeoutUpdateNotifications);
  }

  async updateNotifications() {
    const response = await NotificationsApi.getNotifications();
    this.setNotifications(response.data);
  }

  setNotifications(notifications) {
    this.notifications = notifications;
  }

  updateUserData(user) {
    this.userId = user.id;
    if (user.groups.length !== 1) {
      console.error("User has more than one group");
      return;
    }
    this.username = user.username;
    this.email = user.email;
    this.role = user.groups[0];
    this.isLoad = true;
  }

  setAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
    this.accessToken = accessToken;
  }

  removeAccessToken() {
    localStorage.removeItem("accessToken");
    this.accessToken = null;
  }

  removeAuthData() {
    this.removeAccessToken();
    this.userId = null;
    this.role = null;
    this.username = null;
    this.email = null;
    this.isLoad = false;

    this.onDestroyUser();
  }

  get meIsManufacturer() {
    return this.role === ROLES.MANUFACTURER;
  }
}

const userStore = new UserStore();
export default userStore;
