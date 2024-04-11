import * as process from "process";

const host =
  process.env?.REACT_APP_BACKEND_URL || "http://docs-google.ru:8000/";

export const BASE_URL = `${host}api/`;

export const MEDIA_URL = `${BASE_URL}app`;

export const EXCEL_PATHS_PATTERN_URL = `${BASE_URL}app/manufacter/path/excel/`;

export const NO_PHOTO = "https://www.interra-rus.com/storage/media/default.png";
