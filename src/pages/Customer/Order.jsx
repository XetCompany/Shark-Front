import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Grid,
  Container,
  Divider,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import { RouterContext } from "mobx-state-router";
import {
  ORDER_STATUS_RUS,
  PATH_TYPE_RUS,
} from "@pages/Customer/Cart/constants.js";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { RoutesEnum } from "@/router/index.jsx";

export const Order = observer(() => {
  const routerStore = useContext(RouterContext);
  const orderId = parseInt(
    routerStore?.routerState?.params?.orderId ?? "0",
    10,
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await productsApi.order(orderId);
        customerStore.setCustomerOrder(response.data);
        console.log(response.data, "Информация о заказе загружена");
      } catch (error) {
        console.error("Ошибка при получении данных заказа:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const order = customerStore.customerOrder;

  const handleReorderClick = async (orderId) => {
    await productsApi.orderFromCart(orderId);
    await routerStore.goTo(RoutesEnum.CART);
  };

  return !customerStore.customerOrder ? null : (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{
          padding: 2,
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Grid item xs={5}>
          <Typography variant="h4" component="h2" gutterBottom>
            Детали Заказа №{orderId}
          </Typography>
        </Grid>
        {!order ? (
          <рс variant="h6">Заказ не найден или ошибка загрузки данных.</рс>
        ) : (
          <Grid item xs={12} md={8}>
            <Card
              key={order.id}
              raised
              sx={{
                marginBottom: 2,
                overflow: "visible",
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Заказ №: {order.id}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Статус: {ORDER_STATUS_RUS[order.status] || "Не указан"}
                </Typography>
                {order.decline_reason && (
                  <Typography variant="body2" color="error">
                    Причина отказа: {order.decline_reason}
                  </Typography>
                )}

                <Divider sx={{ margin: "20px 0" }} />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <ShoppingCartIcon color="primary" sx={{ marginRight: 1 }} />
                  <Typography variant="h6">Продукты:</Typography>
                </Box>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Продукт</TableCell>
                      <TableCell>Количество</TableCell>
                      <TableCell>Цена за единицу</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.products.map((productOrder) => (
                      <TableRow key={productOrder.id}>
                        <TableCell>{productOrder.product.name}</TableCell>
                        <TableCell>{productOrder.count} шт.</TableCell>
                        <TableCell>{productOrder.product.price} руб.</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                    marginTop: 5,
                  }}
                >
                  <LocalShippingIcon color="primary" sx={{ marginRight: 1 }} />
                  <Typography variant="h6">Пути доставки:</Typography>
                </Box>
                <List>
                  {order.group_paths.map((groupPath, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <Grid container spacing={2}>
                        {groupPath.paths.map((path, idx) => (
                          <Grid item xs={12} sm={6} key={idx}>
                            <Typography>
                              {path.path.point_a.name} {"--> "}
                              {path.path.point_b.name} -{" "}
                              {PATH_TYPE_RUS[path.path.type]}
                            </Typography>
                            <Typography variant="body2">
                              <b>Цена:</b> {path.path.price} руб., <b>Длина:</b>{" "}
                              {path.path.length}
                              <br />
                              <b>Продукт: </b>
                              {groupPath.product.name}
                            </Typography>
                          </Grid>
                        ))}
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            Склад: {groupPath.warehouse}, Количество:{" "}
                            {groupPath.count}
                          </Typography>

                          <Divider sx={{ margin: "15px 0" }} />
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleReorderClick(order.id)}
                sx={{ marginBottom: 3 }}
              >
                Повторить заказ
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
});
