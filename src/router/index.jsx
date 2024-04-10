import { Register } from "@pages/Register/Register.jsx";
import { Home } from "@pages/Home/Home.jsx";
import { Login } from "@pages/Login/Login.jsx";
import { ResetPassword } from "@pages/ResetPassword/ResetPassword.jsx";
import { RequestResetPassword } from "@pages/RequestResetPassword/RequestResetPassword.jsx";
import { Products } from "@pages/Products/Products.jsx";

export enum RoutesEnum {
  HOME = "home",
  LOGIN = "login",
  REGISTER = "register",
  RESET_PASSWORD = "reset_password",
  RESET_PASSWORD_REQUEST = "reset_password_request",
  PRODUCTS = "products",
}

export const PATHS: Record<RoutesEnum, string> = {
  [RoutesEnum.HOME]: "/about-us",
  [RoutesEnum.LOGIN]: "/login",
  [RoutesEnum.REGISTER]: "/register",
  [RoutesEnum.RESET_PASSWORD]: "/reset-password/request",
  [RoutesEnum.RESET_PASSWORD_REQUEST]: `/reset-password/:userId`,
  [RoutesEnum.PRODUCTS]: "/",
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
    name: RoutesEnum.RESET_PASSWORD_REQUEST,
    pattern: PATHS[RoutesEnum.RESET_PASSWORD_REQUEST],
  },
  {
    name: RoutesEnum.PRODUCTS,
    pattern: PATHS.products,
  },
];

export const viewMap = {
  home: <Home />,
  login: (
    <div className="layout">
      <Login />
    </div>
  ),
  register: (
    <div className="layout">
      <Register />
    </div>
  ),
  reset_password: (
    <div className="layout">
      <ResetPassword />
    </div>
  ),
  reset_password_request: (
    <div className="layout">
      <RequestResetPassword />
    </div>
  ),
  products: <Products />,
};
