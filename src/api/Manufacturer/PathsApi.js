import BaseApi from "@/api/base/BaseApi.js";

class PathsApi extends BaseApi {
  static INTERMEDIARY_URL = 'app/manufacter/path/';

  static async getPaths() {
    const url = this.buildUrl();
    return await this.sendGet({ url, isAuth: true });
  }
}

export default PathsApi;
