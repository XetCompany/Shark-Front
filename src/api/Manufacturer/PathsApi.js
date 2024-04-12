import BaseApi from "@/api/base/BaseApi.js";

class PathsApi extends BaseApi {
  static INTERMEDIARY_URL = "app/manufacter/path/";

  static async getPaths() {
    const url = this.buildUrl();
    return await this.sendGet({ url, isAuth: true });
  }

  static async uploadExcelFile(file) {
    const url = this.buildUrl("excel/");
    const data = {
      excel: file,
    };
    return await this.sendPost({
      url, data, isAuth: true,
    });
  }

  static async createPath(data) {
    const url = this.buildUrl();
    return await this.sendPost({
      url, data, isAuth: true,
    });
  }

  static async deletePaths(ids) {
    const url = this.buildUrl();
    const data = {
      paths: ids,
    };
    return await this.sendDelete({
      url, data, isAuth: true,
    });
  }

  static async updatePath(id, data) {
    const url = this.buildUrl(`${id}/`);
    return await this.sendPut({
      url, data, isAuth: true,
    });
  }
}

export default PathsApi;
