export const SORT = Object.freeze({
  PRICE: "price",
  TIME: "time",
  DISTANCE: "distance",
  ALL: "all",
});

export const SORT_RUS = Object.freeze({
  [SORT.ALL]: "Все",
  [SORT.TIME]: "Времени",
  [SORT.DISTANCE]: "Дистанции",
  [SORT.PRICE]: "Цене",
});

export const PATH_TYPE = Object.freeze({
  AUTOMOBILE: "automobile",
  RAILWAY: "railway",
  SEA: "sea",
  RIVER: "river",
  AIR: "air",
  INSTANT: "instant",
});

export const PATH_TYPE_RUS = Object.freeze({
  [PATH_TYPE.AIR]: "Воздушный",
  [PATH_TYPE.SEA]: "Морской",
  [PATH_TYPE.RIVER]: "Речной",
  [PATH_TYPE.RAILWAY]: "Железнодорожный",
  [PATH_TYPE.AUTOMOBILE]: "Автомобильный",
  [PATH_TYPE.INSTANT]: "Мгновенный",
});

export const ORDER_STATUS = Object.freeze({
  AWAITING: "awaiting",
  IN_PROGRESS: "in_progress",
  ADOPTED: "adopted",
  DECLINED: "declined",
});

export const ORDER_STATUS_RUS = Object.freeze({
  [ORDER_STATUS.AWAITING]: "Ожидает забора",
  [ORDER_STATUS.ADOPTED]: "Принят",
  [ORDER_STATUS.DECLINED]: "Отклонен",
  [ORDER_STATUS.IN_PROGRESS]: "В процессе",
});
