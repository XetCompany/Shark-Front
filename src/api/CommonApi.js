import BaseApi from "@/api/base/BaseApi.js";

class CommonApi extends BaseApi {
  static async getCities() {
    const url = this.buildUrl("app/common/cities/");
    return await this.sendGet({ url });
  }

  static async getCategories() {
    const url = this.buildUrl("app/common/categories/");
    return await this.sendGet({ url });
  }
}

export default CommonApi;
