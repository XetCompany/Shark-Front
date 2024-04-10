import ApiClass from "@/api/base/BaseApi.js";

class  UserApi extends ApiClass {
  static async login(data) {
    const url = this.buildUrl('auth/login/token/');
    return await this.sendPost({ url, data });
  }

  static async getUserInfo() {
    const url = this.buildUrl('app/common/account/');
    return await this.sendGet({ url, isAuth: true });
  }
}

export default UserApi;