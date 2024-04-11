import BaseApi from "@/api/base/BaseApi.js";

class WHProductsApi extends BaseApi {
  static INTERMEDIARY_URL = "app/manufacter/point/";

  static async getProducts(warehouseId) {
    const url = this.buildUrl(`${warehouseId}/products/`);
    return await this.sendGet({ url, isAuth: true });
  }

  static async addProduct(warehouseId, productId, count) {
    const url = this.buildUrl(`${warehouseId}/products/${productId}/`);
    const data = { count };
    return await this.sendPost({ url, data, isAuth: true });
  }

  static async removeProduct(warehouseId, productId) {
    const url = this.buildUrl(`${warehouseId}/products/${productId}/`);
    return await this.sendDelete({ url, isAuth: true });
  }
}

export default WHProductsApi;
