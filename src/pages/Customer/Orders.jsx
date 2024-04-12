import React, { useContext, useEffect, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import { RouterContext } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import {
  ORDER_STATUS,
  ORDER_STATUS_RUS,
} from "@pages/Customer/Cart/constants.js";

export const Orders = observer(() => {
  const routerStore = useContext(RouterContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [declineReason, setDeclineReason] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await productsApi.orders();
      customerStore.setCustomerOrders(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных заказов:", error);
    }
  };

  const handleReorder = async (orderId) => {
    await productsApi.orderFromCart(orderId);
    await routerStore.goTo(RoutesEnum.CART);
  };

  const handleDialogOpen = (order) => {
    setCurrentOrder(order);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeclineReason("");
  };

  const updateOrderInState = (orderId, status) => {
    const updatedOrders = customerStore.customerOrders.map((order) =>
      order.id === orderId ? { ...order, status: status } : order,
    );
    customerStore.setCustomerOrders(updatedOrders);
  };

  const handleAcceptOrder = async (order) => {
    await productsApi.orderStatus({ status: "adopted" }, order.id);
    updateOrderInState(order.id, "adopted");
    handleDialogClose();
  };

  const handleDeclineOrder = async () => {
    await productsApi.orderStatus(
      {
        status: "declined",
        decline_reason: declineReason,
      },
      currentOrder.id,
    );
    updateOrderInState(currentOrder.id, "declined");
    handleDialogClose();
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
                  {order.status === ORDER_STATUS.AWAITING && (
                    <>
                      {" "}
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleAcceptOrder(order)}
                      >
                        <ThumbUpOutlinedIcon />
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleDialogOpen(order)}
                      >
                        <ThumbDownAltOutlinedIcon />
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            ))
        ) : (
          <Typography>Заказы не найдены.</Typography>
        )}
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Обновление статуса заказа</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Опишите причину отказа от заказа:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="declineReason"
            label="Причина отказа"
            type="text"
            fullWidth
            variant="outlined"
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Отменить
          </Button>
          <Button onClick={handleDeclineOrder} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
