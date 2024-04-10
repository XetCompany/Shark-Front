import BaseApi from "@/api/base/BaseApi.js";

class PointsApi extends BaseApi {
  static INTERMEDIARY_URL = 'app/manufacter/point/';

  static async getPoints() {
    const url = this.buildUrl();
    return await this.sendGet({ url, isAuth: true });
  }

  static async addPoint(data) {
    const url = this.buildUrl();
    return await this.sendPost({ url, data, isAuth: true });
  }
}

export default PointsApi;
