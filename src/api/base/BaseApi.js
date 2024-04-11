import axios from "axios";
import Url from "@/api/base/Url.js";
import { getAccessTokenFromLocalStorage } from "@/api/utils.js";

class ApiClass {
  static INTERMEDIARY_URL = "";

  static getDefaultHeaders({ isAuth = false }) {
    if (isAuth) {
      return {
        Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        "Content-Type": "application/json",
      };
    }
    return {};
  }

  static buildUrl(route = "") {
    route = this.INTERMEDIARY_URL + route;
    return new Url({ route }).defaultUrl;
  }

  static buildUrlWithParams(route = "", params = {}) {
    route = this.INTERMEDIARY_URL + route;
    return new Url({ route, params }).formattedUrlWithQuery;
  }

  static async sendRequest({ method, params = {}, data, url, isAuth = false }) {
    const headers = params.headers || {};
    for (const [key, value] of Object.entries(this.getDefaultHeaders({ isAuth }))) {
      if (!Object.prototype.hasOwnProperty.call(headers, key)) {
        headers[key] = value;
      }
    }
    params.headers = headers;

    let response;
    if (data === undefined) {
      response = await method(url, params);
    } else {
      response = await method(url, data, params);
    }

    return response;
  }

  static async sendGet({ url, params, isAuth }) {
    return await this.sendRequest({
      method: axios.get,
      url,
      params,
      isAuth,
    });
  }

  static async sendPost({ url, data, params, isAuth }) {
    if (!data) {
      data = null;
    }
    return await this.sendRequest({
      method: axios.post,
      url,
      data,
      params,
      isAuth,
    });
  }

  static async sendPut({ url, data, params, isAuth }) {
    if (!data) {
      data = null;
    }
    return await this.sendRequest({
      method: axios.put,
      url,
      data,
      params,
      isAuth,
    });
  }

  static async sendDelete({ url, params, isAuth }) {
    return await this.sendRequest({
      method: axios.delete,
      url,
      params,
      isAuth,
    });
  }
}

export default ApiClass;
