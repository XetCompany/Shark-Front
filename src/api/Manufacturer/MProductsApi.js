import BaseApi from "@/api/base/BaseApi.js";

class MProductsApi extends BaseApi {
  static INTERMEDIARY_URL = "app/manufacter/product/";

  static async getProducts() {
    const url = this.buildUrl();
    return await this.sendGet({ url, isAuth: true });
  }
}

export default MProductsApi;
