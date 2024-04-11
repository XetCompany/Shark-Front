import ApiClass from "@/api/base/BaseApi.js";

class ProductsApi extends ApiClass {
  static INTERMEDIARY_URL = "app/customer/";

  static async customerProducts() {
    const url = this.buildUrl("products/");
    return await this.sendGet({ url, isAuth: true });
  }

  static async customerProduct(productId) {
    const url = this.buildUrl(`products/${productId}/`);
    return await this.sendGet({ url, isAuth: true });
  }

  static async customerProductCount(data) {
    const url = this.buildUrl(`cart/${data.product_id}/`);
    return await this.sendPut({ url, data, isAuth: true });
  }

  static async getCart() {
    const url = this.buildUrl("cart/");
    return await this.sendGet({ url, isAuth: true });
  }

  static async addToCart(data) {
    const url = this.buildUrl(`cart/${data.product_id}/`);
    return await this.sendPost({ url, data, isAuth: true });
  }

  static async removerFromCart(productId) {
    const url = this.buildUrl(`cart/${productId}/`);
    return await this.sendDelete({ url, isAuth: true });
  }

  static async createOrder() {
    // ToDo: доделать создание заказа со всеми путями и т.д., скорее всего нужно будет несколько запросов и переименовать этот
    // const url = this.buildUrl(`cart/${productId}/`);
    // return await this.sendDelete({ url, isAuth: true });
  }

  static async orders() {
    const url = this.buildUrl(`orders/`);
    return await this.sendGet({ url, isAuth: true });
  }

  static async getAllPaths() {
    const url = this.buildUrl(`pickup_points/`);
    return await this.sendGet({ url, isAuth: true });
  }

  static async getPoints(pickupPointId, params) {
    const url = this.buildUrlWithParams(`paths/${pickupPointId}/`, params);
    return await this.sendGet({ url, isAuth: true });
  }
}

export default ProductsApi;
