import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { useRouterStore } from "mobx-state-router";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import List from "@mui/material/List";
import { ORDER_STATUS_RUS } from "@pages/Customer/Cart/constants.js";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart.js";
import LocalShippingIcon from "@mui/icons-material/LocalShipping.js";
import { TYPE_PATH_TO_EMOJI } from "@common/common.js";

export const ManufacturerOrder = observer(() => {
  const routerStore = useRouterStore();
  const { params } = routerStore.routerState;
  const order = manufacturerStore.getOrderById(parseInt(params.orderId));

  if (!order) {
    return <ContentPageWrapper title="Информация о Заказе">
      <Container>
        <Paper>
          <Typography variant="h5" component="h1" gutterBottom>
            Заказ не найден
          </Typography>
        </Paper>
      </Container>
    </ContentPageWrapper>;
  }

  return (
    <ContentPageWrapper title="Информация о Заказе">
      {/*<Container className="order-detail">*/}
      {/*  <Paper*/}
      {/*    sx={{*/}
      {/*      padding: 2,*/}
      {/*      marginBottom: 2,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Typography variant="h5" component="div" align="left">*/}
      {/*      Заказ №{order.id}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="text.secondary" align="left">*/}
      {/*      Cоздан: {formatCustomDate(order.created_at)}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="text.secondary" align="left">*/}
      {/*      Покупатель: {order.user.username}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="text.secondary" align="left">*/}
      {/*      Статус: {ORDER_STATUS_RUS[order.status]}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="text.secondary" align="left">*/}
      {/*      Причина отказа: {order.decline_reason || 'нет'}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="text.secondary" align="left">*/}
      {/*      Итого цена: {order.total_price} руб.*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="text.secondary" align="left">*/}
      {/*      Итого количество: {order.total_count} шт.*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="text.secondary" align="left">*/}
      {/*      Итого длина пути: {order.total_path_length} км.*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="text.secondary" align="left">*/}
      {/*      Итого цена пути: {order.total_path_price} руб.*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="text.secondary" align="left">*/}
      {/*      Итого время пути: {order.total_path_time} ч.*/}
      {/*    </Typography>*/}
      {/*  </Paper>*/}
      {/*</Container>*/}
      <Typography variant="h2" gutterBottom>
        Заказ №: {order.id}
      </Typography>
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
                        <TableCell>
                          {productOrder.product.price} руб.
                        </TableCell>
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
                  <LocalShippingIcon
                    color="primary"
                    sx={{ marginRight: 1 }}
                  />
                  <Typography variant="h6">Пути доставки:</Typography>
                </Box>
                <List>
                  {order.group_paths.map((groupPath, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <Grid container spacing={2}>
                        {groupPath.paths.map((path, idx) => (
                          <Grid item xs={12} sm={6} key={idx}>
                            <Typography>
                              {path.path.point_a.name} {TYPE_PATH_TO_EMOJI[path.path.type]} {"⇨ "}
                              {path.path.point_b.name}
                            </Typography>
                            <Typography variant="body2">
                              <b>Цена:</b> {path.path.price} руб.,{" "}
                              <b>Длина:</b> {path.path.length}
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

                <Typography variant="body2" color="textSecondary" align="left">
                  Итого цена: {order.total_price} руб.
                </Typography>
                <Typography variant="body2" color="textSecondary" align="left">
                  Итого количество: {order.total_count} шт.
                </Typography>
                <Typography variant="body2" color="textSecondary" align="left">
                  Итого длина пути: {order.total_path_length} км.
                </Typography>
                <Typography variant="body2" color="textSecondary" align="left">
                  Итого цена пути: {order.total_path_price} руб.
                </Typography>
                <Typography variant="body2" color="textSecondary" align="left">
                  Итого время пути: {order.total_path_time} ч.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ContentPageWrapper>
  );
});