import BaseApi from "@/api/base/BaseApi.js";

class MProductsApi extends BaseApi {
  static INTERMEDIARY_URL = "app/manufacter/product/";

  static async getProducts() {
    const url = this.buildUrl();
    return await this.sendGet({ url, isAuth: true });
  }

  static async createProduct(data) {
    const url = this.buildUrl();
    return await this.sendPost({ url, data, isAuth: true });
  }

  static async deleteProduct(id) {
    const url = this.buildUrl(`${id}/`);
    return await this.sendDelete({ url, isAuth: true });
  }
}

export default MProductsApi;
