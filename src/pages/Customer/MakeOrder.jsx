import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
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
import { TYPE_PATH_TO_EMOJI } from "@common/common.js";

export const MakeOrder = observer(() => {
  const routerStore = useContext(RouterContext);

  useEffect(() => {
    if (!customerStore.customerSelectedOrder)
      routerStore.goTo(RoutesEnum.CREATE_ORDER);
    const fetchOrder = async () => {
      const response = await productsApi.makeOrder(
        customerStore.customerSelectedOrder,
      );
      customerStore.setCustomerCurrentOrder(response.data);
      console.log(response.data, "Информация о новом заказе загружена");
    };

    fetchOrder();
  }, []);

  const order = customerStore.customerCurrentOrder;

  return !order ? (
    <Typography variant="h5" gutterBottom>
      Нет информации по заказу, выберите другие параметры.
    </Typography>
  ) : (
    <Grid container spacing={2} sx={{ padding: 3, justifyContent: "center" }}>
      <Grid item xs={12} md={10}>
        <Typography variant="h4" gutterBottom>
          Подробности заказа
        </Typography>
        <Card raised>
          <CardContent>
            <Typography variant="h5" component="h2">
              Статус заказа: {ORDER_STATUS_RUS[order.status] || "Не указан"}
            </Typography>
            {order.decline_reason && (
              <Typography variant="subtitle1" color="error">
                Причина отказа: {order.decline_reason}
              </Typography>
            )}
            <Typography variant="h6" mt={2}>
              Продукты в заказе:
            </Typography>
            <List>
              {order.products.map((product, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`${product.product.name} - ${product.count} шт.`}
                    secondary={`Цена за единицу: ${product.product.price} руб.`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" mt={2}>
              Пути доставки:
            </Typography>
            {order.group_paths.map((group, index) => (
              <List key={index} sx={{ mb: 2 }}>
                <Typography variant="h6" mt={2} textAlign="left">
                  Продукт: {group.product.name}
                </Typography>
                <Typography variant="subtitle1" textAlign="left">
                  Количество: {group.count} шт.
                </Typography>
                {group.paths.map((path, idx) => (
                  <ListItem key={idx} divider>
                    <ListItemText
                      primary={`${path.path.point_a.name} ${TYPE_PATH_TO_EMOJI[path.path.type]} ⇨ ${path.path.point_b.name}`}
                      secondary={`Тип: ${PATH_TYPE_RUS[path.path.type]}, Цена: ${path.path.price} руб., Длина: ${path.path.length} км`}
                    />
                  </ListItem>
                ))}
              </List>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => routerStore.goTo(RoutesEnum.PRODUCTS)}
        >
          Вернуться к товарам
        </Button>
      </Grid>
    </Grid>
  );
});
