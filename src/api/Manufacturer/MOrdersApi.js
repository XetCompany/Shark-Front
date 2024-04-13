import BaseApi from "@/api/base/BaseApi.js";

class MOrdersApi extends BaseApi {
  static INTERMEDIARY_URL = "app/manufacter/order/";

  static async getOrders() {
    const url = this.buildUrl();
    const response = await this.sendGet({ url, isAuth: true });
    for (const order of response.data) {
      order.created_at = new Date(order.created_at);
    }
    return response;
  }

}

export default MOrdersApi;
