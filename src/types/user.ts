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
  reset_password?: string;
};
