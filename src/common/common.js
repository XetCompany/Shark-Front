export const ROLES = Object.freeze({
  MANUFACTURER: "manufacturer",
  CUSTOMER: "customer",
});

export const ROLES_RUS = {
  [ROLES.MANUFACTURER]: "Производитель",
  [ROLES.CUSTOMER]: "Заказчик",
};

export const POINT_TYPES = Object.freeze({
  WAREHOUSE: "warehouse",
  PICKUP_POINT: "pickup_point",
});

export const POINT_TYPES_RUS = {
  [POINT_TYPES.WAREHOUSE]: "Склад",
  [POINT_TYPES.PICKUP_POINT]: "Пункт выдачи",
};
