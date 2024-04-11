import { BASE_URL } from "@/api/constants.js";

export default class Url {
  constructor({ serverUrl, route, params }) {
    this.route = route;
    this.params = params;
    this.serverUrl = serverUrl || BASE_URL;
  }

  #formattedUrlQueriesFromPatternsArray(patternsArray, symbol = '&') {
    return patternsArray.join(symbol);
  }

  #formattedUrlQueriesFromQueriesObject(queries, symbol = '&') {
    return this.#formattedUrlQueriesFromPatternsArray(
      Object.entries(queries).map(([key, value]) => {
        return `${key}=${value}`;
      }),
      symbol,
    );
  }

  get formattedUrlWithQuery() {
    return this.getDefaultUrl(`${this.route}?${this.#formattedUrlQueriesFromQueriesObject(this.params)}`);
  }

  getDefaultUrl(route) {
    return this.serverUrl + route;
  }

  get defaultUrl() {
    return this.serverUrl + this.route;
  }
}
