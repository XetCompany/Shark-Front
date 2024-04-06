import { Register } from "@pages/Register/Register.tsx";
import { Home } from "@pages/Home/Home.tsx";
import { Login } from "@pages/Login/Login.tsx";

export enum RoutesEnum {
  HOME = "home",
  LOGIN = "login",
  REGISTER = "register",
}

export const PATHS: Record<RoutesEnum, string> = {
  [RoutesEnum.HOME]: "/",
  [RoutesEnum.LOGIN]: "/login",
  [RoutesEnum.REGISTER]: "/register",
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
];

export const viewMap = {
  home: <Home />,
  login: <Login />,
  register: <Register />,
};
