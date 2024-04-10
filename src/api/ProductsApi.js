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
}

export default ProductsApi;
