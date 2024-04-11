import { Register } from "@pages/Register/Register.jsx";
import { Home } from "@pages/Home/Home.jsx";
import { Login } from "@pages/Login/Login.jsx";
import { ResetPassword } from "@pages/ResetPassword/ResetPassword.jsx";
import { RequestResetPassword } from "@pages/RequestResetPassword/RequestResetPassword.jsx";
import { CustomerProducts } from "@pages/Customer/CustomerProducts/CustomerProducts.jsx";
import { CustomerProduct } from "@pages/Customer/CustomerProduct/CustomerProduct.jsx";
import { Cart } from "@pages/Customer/Cart/Cart.jsx";
import { Points } from "@pages/Manufacturer/Points/Points.jsx";
import { Order } from "@pages/Customer/Order/Order.jsx";
import { CreateOrder } from "@pages/Customer/CreateOrder/CreateOrder.jsx";
import { PointCreate } from "@pages/Manufacturer/Points/PointCreate.jsx";
import { PointDetail } from "@pages/Manufacturer/Points/PointDetail.jsx";
import { ManufacturerProducts } from "@pages/Manufacturer/Products/Products.jsx";
import { ManufacturerProductCreate } from "@pages/Manufacturer/Products/ProductCreate.jsx";
import { ManufacturerProductDetails } from "@pages/Manufacturer/Products/ProductDetail.jsx";
import { Paths } from "@pages/Manufacturer/Paths/Paths.jsx";
import { PathCreate } from "@pages/Manufacturer/Paths/PathCreate.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const RoutesEnum = Object.freeze({
  HOME: "home",
  LOGIN: "login",
  REGISTER: "register",
  RESET_PASSWORD: "reset_password",
  RESET_PASSWORD_REQUEST: "reset_password_request",

  // Customer routes
  PRODUCTS: "products",
  PRODUCT: "product",
  CART: "cart",
  ORDERS: "orders",
  CREATE_ORDER: "create_order",

  // Manufacturer routes
  POINTS: "points",
  POINT_CREATE: "point_create",
  POINT_DETAILS: "point_details",

  M_PRODUCTS: "m_products",
  M_PRODUCTS_CREATE: "m_products_create",
  M_PRODUCTS_DETAILS: "m_products_details",

  PATHS: "paths",
  PATH_CREATE: "path_create",
});

// eslint-disable-next-line react-refresh/only-export-components
export const PATHS = {
  [RoutesEnum.HOME]: "/about-us",
  [RoutesEnum.LOGIN]: "/login",
  [RoutesEnum.REGISTER]: "/register",
  [RoutesEnum.RESET_PASSWORD]: "/reset-password/request",
  [RoutesEnum.RESET_PASSWORD_REQUEST]: `/reset-password/:id`,

  // Customer routes
  [RoutesEnum.PRODUCTS]: "/",
  [RoutesEnum.PRODUCT]: "/product/:prodId",
  [RoutesEnum.CART]: "/cart",
  [RoutesEnum.ORDERS]: "/orders",
  [RoutesEnum.CREATE_ORDER]: "/create/order",

  // Manufacturer routes
  [RoutesEnum.POINTS]: "/points",
  [RoutesEnum.POINT_CREATE]: "/points/create",
  [RoutesEnum.POINT_DETAILS]: "/points/:id",

  [RoutesEnum.M_PRODUCTS]: "/m_products",
  [RoutesEnum.M_PRODUCTS_CREATE]: "/m_products/create",
  [RoutesEnum.M_PRODUCTS_DETAILS]: "/m_products/:id",

  [RoutesEnum.PATHS]: "/paths",
  [RoutesEnum.PATH_CREATE]: "/paths/create",
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

  // Customer routes
  {
    name: RoutesEnum.PRODUCTS,
    pattern: PATHS.products,
  },
  {
    name: RoutesEnum.PRODUCT,
    pattern: PATHS.product,
  },
  {
    name: RoutesEnum.CART,
    pattern: PATHS.cart,
  },
  {
    name: RoutesEnum.ORDERS,
    pattern: PATHS.orders,
  },
  {
    name: RoutesEnum.CREATE_ORDER,
    pattern: PATHS.create_order,
  },

  // Manufacturer routes
  {
    name: RoutesEnum.POINTS,
    pattern: PATHS.points,
  },
  {
    name: RoutesEnum.POINT_CREATE,
    pattern: PATHS.point_create,
  },
  {
    name: RoutesEnum.POINT_DETAILS,
    pattern: PATHS.point_details,
  },
  {
    name: RoutesEnum.M_PRODUCTS,
    pattern: PATHS.m_products,
  },
  {
    name: RoutesEnum.M_PRODUCTS_CREATE,
    pattern: PATHS.m_products_create,
  },
  {
    name: RoutesEnum.M_PRODUCTS_DETAILS,
    pattern: PATHS.m_products_details,
  },
  {
    name: RoutesEnum.PATHS,
    pattern: PATHS.paths,
  },
  {
    name: RoutesEnum.PATH_CREATE,
    pattern: PATHS.path_create,
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

  // Customer routes
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
  cart: (
    <div className="layout">
      <Cart />
    </div>
  ),
  create_order: (
    <div className="layout">
      <CreateOrder />
    </div>
  ),
  orders: (
    <div className="layout">
      <Order />
    </div>
  ),

  // Manufacturer routes
  points: (
    <div className="layout">
      <Points />
    </div>
  ),
  point_create: (
    <div className="layout">
      <PointCreate />
    </div>
  ),
  point_details: (
    <div className="layout">
      <PointDetail />
    </div>
  ),
  m_products: (
    <div className="layout">
      <ManufacturerProducts />
    </div>
  ),
  m_products_create: (
    <div className="layout">
      <ManufacturerProductCreate />
    </div>
  ),
  m_products_details: (
    <div className="layout">
      <ManufacturerProductDetails />
    </div>
  ),
  paths: (
    <div className="layout">
      <Paths />
    </div>
  ),
  path_create: (
    <div className="layout">
      <PathCreate />
    </div>
  ),
};
