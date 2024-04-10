import { makeAutoObservable } from "mobx";

class UserStore {
  userId = null;
  accessToken = null;
  refreshToken = null;
  role = null;
  isAuth = false;
  user = null;
  userIsLoaded = false;
  resetPassword = null;
  isShowNotification = false;
  notifications = [];

  constructor() {
    this.userId = null;
    this.accessToken = null;
    this.refreshToken = null;
    this.role = null;
    this.isAuth = false;
    this.user = null;
    this.userIsLoaded = false;
    this.resetPassword = null;
    this.isShowNotification = false;
    this.notifications = [];

    this.init();
    makeAutoObservable(this);
  }

  init() {
    const accessToken = JSON.parse(localStorage.getItem("token"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  // setUser(user) {
  //   this.user = user;
  // }
  //
  // setIsAuth(isAuth) {
  //   this.isAuth = isAuth;
  // }
  //
  // setUserById(id) {
  //   this.userId = id;
  // }
  //
  // setRole(role) {
  //   this.role = role;
  // }

  setResetPasswordToken(resetPassword: null) {
    this.resetPassword = resetPassword;
  }
}

const userStore = new UserStore();
export default userStore;
