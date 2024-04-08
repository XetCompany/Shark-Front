import { Register } from "@pages/Register/Register.tsx";
import { Home } from "@pages/Home/Home.tsx";
import { Login } from "@pages/Login/Login.tsx";
import { ResetPassword } from "@pages/ResetPassword/ResetPassword.tsx";
import { RequestResetPassword } from "@pages/RequestResetPassword/RequestResetPassword.tsx";

export enum RoutesEnum {
  HOME = "home",
  LOGIN = "login",
  REGISTER = "register",
  RESET_PASSWORD = "reset_password",
  RESET_PASSWORD_REQUEST = "reset_password_request",
}

export const PATHS: Record<RoutesEnum, string> = {
  [RoutesEnum.HOME]: "/",
  [RoutesEnum.LOGIN]: "/login",
  [RoutesEnum.REGISTER]: "/register",
  [RoutesEnum.RESET_PASSWORD]: "/reset-password",
  [RoutesEnum.RESET_PASSWORD_REQUEST]: `/reset-password/`,
  // ToDo: нужно норм токен смотреть после reset-password
};

export const Routes = [
  { name: RoutesEnum.HOME, pattern: PATHS.home },
  {
    name: RoutesEnum.LOGIN,
    pattern: PATHS.login,
  },
  {
    name: RoutesEnum.REGISTER,
    pattern: PATHS.register,
  },
  {
    name: RoutesEnum.RESET_PASSWORD,
    pattern: PATHS.reset_password,
  },
  {
    name: RoutesEnum.RESET_PASSWORD,
    pattern: PATHS.reset_password_request,
  },
];

export const viewMap = {
  home: <Home />,
  login: <Login />,
  register: <Register />,
  reset_password: <ResetPassword />,
  reset_password_request: <RequestResetPassword />,
};
