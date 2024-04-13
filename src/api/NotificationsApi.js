import BaseApi from "@/api/base/BaseApi.js";
import { getAccessTokenFromLocalStorage } from "@/api/utils.js";

export class NotificationsApi extends BaseApi {
  static INTERMEDIARY_URL = "app/common/notifications/";

  static async getNotifications() {
    const access = getAccessTokenFromLocalStorage();
    if (!access) {
      return [];
    }
    const url = this.buildUrl();
    return await this.sendGet({ url, isAuth: true });
  }

  static async markAllAsRead() {
    const url = this.buildUrl("read/");
    const data = {};
    return await this.sendPost({ url, data, isAuth: true });
  }
}
