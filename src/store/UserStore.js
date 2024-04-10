import { makeAutoObservable } from "mobx";
import { getAccessTokenFromLocalStorage } from "@/api/utils.js";
import UserApi from "@/api/UserApi.js";
import { ROLES } from "@common/common.js";

class UserStore {
  accessToken = null;

  userId = null;
  role = null;
  username = null;
  email = null;
  isLoad = false;

  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  init() {
    this.accessToken = getAccessTokenFromLocalStorage();
    setTimeout(() => {
      this.updateUser();
    });
  }

  async updateUser() {
    const response = await UserApi.getUserInfo();
    if (response?.status !== 200) {
      return;
    }
    const user = response.data;
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

  get meIsManufacturer() {
    return this.role === ROLES.MANUFACTURER;
  }
}

const userStore = new UserStore();
export default userStore;
