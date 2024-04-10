import { BASE_URL } from "@/api/constants.js";

export default class Url {
  constructor({ serverUrl, route, queries }) {
    this.route = route;
    this.queries = queries;
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
    return this.getDefaultUrl(`${this.route}?${this.#formattedUrlQueriesFromQueriesObject(this.queries)}`);
  }

  getDefaultUrl(route) {
    return this.serverUrl + route;
  }

  get defaultUrl() {
    return this.serverUrl + this.route;
  }

  #setQueries(queries) {
    this.queries = queries;
  }

  #setRoute(route) {
    this.route = route;
  }
}
