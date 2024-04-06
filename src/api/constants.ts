import * as process from "process";

const host =
  process.env?.REACT_APP_BACKEND_URL || "http://docs-google.ru:8000/";

export const BASE_URL = `${host}api/`;
