import { Register } from "@pages/Register/Register.jsx";
import { Home } from "@pages/Home/Home.jsx";
import { Login } from "@pages/Login/Login.jsx";
import { ResetPassword } from "@pages/ResetPassword/ResetPassword.jsx";
import { RequestResetPassword } from "@pages/RequestResetPassword/RequestResetPassword.jsx";
import { CustomerProducts } from "@pages/Customer/CustomerProducts/CustomerProducts.jsx";
import { CustomerProduct } from "@pages/Customer/CustomerProduct/CustomerProduct.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const RoutesEnum = Object.freeze({
  HOME: "home",
  LOGIN: "login",
  REGISTER: "register",
  RESET_PASSWORD: "reset_password",
  RESET_PASSWORD_REQUEST: "reset_password_request",
  PRODUCTS: "products",
  PRODUCT: "product",
});

// eslint-disable-next-line react-refresh/only-export-components
export const PATHS = {
  [RoutesEnum.HOME]: "/about-us",
  [RoutesEnum.LOGIN]: "/login",
  [RoutesEnum.REGISTER]: "/register",
  [RoutesEnum.RESET_PASSWORD]: "/reset-password/request",
  [RoutesEnum.RESET_PASSWORD_REQUEST]: `/reset-password/:id`,
  [RoutesEnum.PRODUCTS]: "/",
  [RoutesEnum.PRODUCT]: "/product/:prodId",
};

// eslint-disable-next-line react-refresh/only-export-components
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
  {
    name: RoutesEnum.PRODUCT,
    pattern: PATHS.product,
  },
];

// eslint-disable-next-line react-refresh/only-export-components
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
  products: (
    <div className="layout">
      <CustomerProducts />
    </div>
  ),
  product: (
    <div className="layout">
      <CustomerProduct />
    </div>
  ),
};
