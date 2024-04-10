export type TLoginData = {
  password: string;
  username: string;
};

export type TRegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  role: string;
};

export type TData = {
  access: string;
  refresh: string;
};

export type TResetInput = {
  email?: string;
  password?: string;
  token?: string;
};

export enum RoleEnum {
  MANUFACTURER = "manufacturer",
  CUSTOMER = "customer",
}
