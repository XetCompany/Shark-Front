import { Register } from "@pages/Register/Register.jsx";
import { Home } from "@pages/Home/Home.jsx";
import { Login } from "@pages/Login/Login.jsx";
import { ResetPassword } from "@pages/ResetPassword/ResetPassword.jsx";
import { RequestResetPassword } from "@pages/RequestResetPassword/RequestResetPassword.jsx";
import { CustomerProducts } from "@pages/Customer/CustomerProducts.jsx";
import { CustomerProduct } from "@pages/Customer/CustomerProduct.jsx";
import { Cart } from "@pages/Customer/Cart/Cart.jsx";
import { Points } from "@pages/Manufacturer/Points/Points.jsx";
import { Orders } from "@pages/Customer/Orders.jsx";
import { CreateOrder } from "@pages/Customer/CreateOrder.jsx";
import { PointCreate } from "@pages/Manufacturer/Points/PointCreate.jsx";
import { PointDetail } from "@pages/Manufacturer/Points/PointDetail.jsx";
import { ManufacturerProducts } from "@pages/Manufacturer/Products/Products.jsx";
import { ManufacturerProductCreate } from "@pages/Manufacturer/Products/ProductCreate.jsx";
import { ManufacturerProductDetails } from "@pages/Manufacturer/Products/ProductDetail.jsx";
import { Paths } from "@pages/Manufacturer/Paths/Paths.jsx";
import { PathCreate } from "@pages/Manufacturer/Paths/PathCreate.jsx";
import { MakeOrder } from "@pages/Customer/MakeOrder.jsx";
import { Order } from "@pages/Customer/Order.jsx";

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
  ORDER: "order",
  CREATE_ORDER: "create_order",
  MAKE_ORDER: "make_order",

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
  [RoutesEnum.ORDER]: "/order/:orderId",
  [RoutesEnum.CREATE_ORDER]: "/create/order",
  [RoutesEnum.MAKE_ORDER]: "/make/order",

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
    name: RoutesEnum.ORDER,
    pattern: PATHS.order,
  },
  {
    name: RoutesEnum.CREATE_ORDER,
    pattern: PATHS.create_order,
  },
  {
    name: RoutesEnum.MAKE_ORDER,
    pattern: PATHS.make_order,
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
  login: <Login />,
  register: <Register />,
  reset_password: <ResetPassword />,
  reset_password_request: <RequestResetPassword />,

  // Customer routes
  products: <CustomerProducts />,
  product: <CustomerProduct />,
  cart: <Cart />,
  create_order: <CreateOrder />,
  make_order: <MakeOrder />,
  orders: <Orders />,
  order: <Order />,

  // Manufacturer routes
  points: <Points />,
  point_create: <PointCreate />,
  point_details: <PointDetail />,
  m_products: <ManufacturerProducts />,
  m_products_create: <ManufacturerProductCreate />,
  m_products_details: <ManufacturerProductDetails />,
  paths: <Paths />,
  path_create: <PathCreate />,
};
