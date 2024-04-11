import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import { RouterContext } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import {
  ORDER_STATUS_RUS,
  PATH_TYPE_RUS,
} from "@pages/Customer/Cart/constants.js";

export const MakeOrder = observer(() => {
  const routerStore = useContext(RouterContext);
  console.log(
    customerStore.customerSelectedOrder,
    "customerStore.customerSelectedOrder",
  );
  if (!customerStore.customerSelectedOrder)
    routerStore.goTo(RoutesEnum.CREATE_ORDER);
  useEffect(() => {
    async function fetchOrder() {
      const response = await productsApi.makeOrder(
        customerStore.customerSelectedOrder,
      );
      customerStore.setCustomerOrder(response.data);
      console.log(response.data, "Информация о заказе загружена");
    }

    fetchOrder();
  }, []);

  console.log(
    customerStore.customerOrder,
    !customerStore.customerOrder,
    "asdasd",
    !!customerStore.customerOrder,
  );
  return !customerStore.customerOrder ? (
    <h2>Нет вариантов, выберите другие данные!</h2>
  ) : (
    <div>
      <Grid
        container
        spacing={2}
        style={{ padding: 20, display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Подробности заказа
          </Typography>
        </Grid>
        {customerStore.customerOrder && (
          <Grid item xs={10}>
            <Card raised>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Статус заказа:{" "}
                  <i>{ORDER_STATUS_RUS[customerStore.customerOrder.status]}</i>
                </Typography>
                {customerStore.customerOrder.decline_reason && (
                  <Typography variant="subtitle1" color="error">
                    Причина отказа: {customerStore.customerOrder.decline_reason}
                  </Typography>
                )}
                <Typography variant="h6" component="div">
                  Продукты в заказе:
                </Typography>
                <List>
                  {customerStore.customerOrder.products.map(
                    (product, index) => (
                      <ListItem key={index} divider>
                        <ListItemText
                          primary={`${product.product.name} - ${product.count} шт.`}
                          secondary={`Цена за единицу: ${product.product.price} руб.`}
                        />
                      </ListItem>
                    ),
                  )}
                </List>
                <Typography variant="h6" component="div">
                  Пути доставки:
                </Typography>
                <List>
                  {customerStore.customerOrder.group_paths.map(
                    (group, index) => (
                      <ListItem key={index} divider>
                        <ListItemText
                          primary={`${group.paths[0].path.point_a.name} --> ${group.paths[0].path.point_b.name}`}
                          secondary={`Тип: ${PATH_TYPE_RUS[group.paths[0].path.type]}, Цена: ${group.paths[0].path.price} руб., Длина: ${group.paths[0].path.length} км.`}
                        />
                      </ListItem>
                    ),
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => routerStore.goTo(RoutesEnum.PRODUCTS)}
      >
        {"<--"} Вернуться к товарам
      </Button>
    </div>
  );
});
