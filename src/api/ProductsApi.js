import ApiClass from "@/api/base/BaseApi.js";

class ProductsApi extends ApiClass {
  static async manufacturerProducts() {
    const url = this.buildUrl("app/manufacturer/products/");
    return await this.sendGet({ url });
  }

  static async customerProducts() {
    const url = this.buildUrl("app/customer/products/");
    return await this.sendGet({ url });
  }

  static async customerProduct(productId) {
    const url = this.buildUrl(`app/customer/products/${productId}/`);
    return await this.sendGet({ url });
  }

  static async customerProductCount(productId) {
    const url = this.buildUrl(`app/customer/cart/${productId}/`);
    return await this.sendPut({ url });
  }

  static async cart() {
    const url = this.buildUrl("app/customer/cart/");
    return await this.sendGet({ url, isAuth: true });
  }

  static async addToCart(data) {
    const url = this.buildUrl(`app/customer/cart/${data.product_id}/`);
    return await this.sendPost({ url, data, isAuth: true });
  }
}

export default ProductsApi;
