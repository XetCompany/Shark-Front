import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import { RouterContext } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import { ORDER_STATUS_RUS } from "@pages/Customer/Cart/constants.js";

export const Orders = observer(() => {
  const routerStore = useContext(RouterContext);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await productsApi.orders();
        customerStore.setCustomerOrders(response.data);
        console.log(response.data, "Заказы загружены");
      } catch (error) {
        console.error("Ошибка при получении данных заказов:", error);
      }
    }

    fetchOrders();
  }, []);

  const handleReorder = async (orderId) => {
    await productsApi.orderFromCart(orderId);
    await routerStore.goTo(RoutesEnum.CART);
  };

  const handleViewDetails = (orderId) => {
    routerStore.goTo(RoutesEnum.ORDER, { params: { orderId: orderId } });
  };

  const calculateTotalPrice = (products) =>
    products
      .reduce(
        (acc, product) =>
          acc + product.count * parseFloat(product.product.price),
        0,
      )
      .toFixed(2);

  const orders = customerStore.customerOrders;

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Мои заказы
      </Typography>
      <Divider />
      <div
        style={{
          margin: "20px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 25,
        }}
      >
        {customerStore.customerOrders.length ? (
          orders
            .slice()
            .reverse()
            .map((order) => (
              <Card key={order.id} sx={{ maxWidth: 600, my: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Заказ №{order.id}
                  </Typography>
                  <Typography variant="subtitle1">
                    Статус: {ORDER_STATUS_RUS[order.status] || "Не указан"}
                  </Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Продукт</TableCell>
                        <TableCell align="center">Количество</TableCell>
                        <TableCell align="center">Цена за единицу</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.product.name}</TableCell>
                          <TableCell align="center">{product.count}</TableCell>
                          <TableCell align="center">
                            {product.product.price} руб.
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Всего: {calculateTotalPrice(order.products)} руб.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    Подробнее
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleReorder(order.id)}
                  >
                    Повторить заказ
                  </Button>
                </CardActions>
              </Card>
            ))
        ) : (
          <Typography>Заказы не найдены.</Typography>
        )}
      </div>
    </>
  );
});
