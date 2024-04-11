import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import {
  ORDER_STATUS_RUS,
  PATH_TYPE_RUS,
} from "@pages/Customer/Cart/constants.js";
import { RouterContext } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";

export const Order = observer(() => {
  const routerStore = useContext(RouterContext);

  useEffect(() => {
    async function fetchOrder() {
      const response = await productsApi.orders();
      customerStore.setCustomerOrders(response.data);
      console.log(response.data, "Заказы загружены");
    }

    fetchOrder();
  }, []);

  const handleReorderClick = async (orderId) => {
    await productsApi.orderFromCart(orderId);
    await routerStore.goTo(RoutesEnum.CART);
  };

  return (
    <div
      style={{
        margin: "20px 21.5%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {customerStore.customerOrders.length > 0 ? (
        customerStore.customerOrders.map((order) => (
          <Card
            key={order.id}
            raised
            sx={{ marginBottom: 2, overflow: "visible" }}
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
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
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
                      <TableCell>{productOrder.count}</TableCell>
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
        ))
      ) : (
        <Typography>Заказы не найдены.</Typography>
      )}
    </div>
  );
});
