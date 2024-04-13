import BaseApi from "@/api/base/BaseApi.js";

export class NotificationsApi extends BaseApi {
  static INTERMEDIARY_URL = "app/common/notifications/";

  static async getNotifications() {
    const url = this.buildUrl();
    return await this.sendGet({ url, isAuth: true });
  }

  static async markAllAsRead() {
    const url = this.buildUrl("read/");
    const data = {};
    return await this.sendPost({ url, data, isAuth: true });
  }
}
