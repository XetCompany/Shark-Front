import { observer } from "mobx-react";
import { Button, Card, CardActions, CardContent, Rating, Typography } from "@mui/material";
import { RoutesEnum } from "@/router/index.jsx";
import React from "react";
import { useRouterStore } from "mobx-state-router";
import { ORDER_STATUS_RUS } from "@pages/Customer/Cart/constants.js";
import { formatCustomDate } from "@/api/utils.js";

export const OrderCard = observer(({ order }) => {
  const routerStore = useRouterStore();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" align="left">
          Заказ №{order.id}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          Cоздан: {formatCustomDate(order.created_at)}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          Покупатель: {order.user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          Статус: {ORDER_STATUS_RUS[order.status]}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          Причина отказа: {order.decline_reason || 'нет'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          Итого цена: {order.total_price} руб.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          Итого количество: {order.total_count} шт.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          Итого длина пути: {order.total_path_length} км.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          Итого цена пути: {order.total_path_price} руб.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          Итого время пути: {order.total_path_time} ч.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => routerStore.goTo(RoutesEnum.M_ORDER, {params: {orderId: order.id}})}>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
});