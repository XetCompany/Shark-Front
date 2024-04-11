import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import {
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { customerStore } from "@store/CustomerStore.js";
import productsApi from "@/api/ProductsApi.js";
import { PATH_TYPE_RUS } from "@pages/Customer/Cart/constants.js";
import { RouterContext } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";

export const CreateOrder = observer(() => {
  const routerStore = useContext(RouterContext);

  useEffect(() => {
    if (!customerStore.customerCurrentPath)
      routerStore.goTo(RoutesEnum.PRODUCTS);

    async function fetchPoints() {
      const response = await productsApi.getPoints(
        customerStore.customerCurrentPath,
        customerStore.customerSorts,
      );
      customerStore.setCustomerSearchInfo(response.data);
      console.log(response.data, "Информация о доставке загружена");
    }

    fetchPoints();
  }, []);

  const handleSelectPath = (pathId) => {
    customerStore.setCustomerSelectedOrder(pathId);
    routerStore.goTo(RoutesEnum.MAKE_ORDER);
    console.log("Выбранный вариант:", pathId);
  };

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2" gutterBottom>
          Выбор заказа
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Вариант</TableCell>
                <TableCell align="center">Путь</TableCell>
                <TableCell align="center">Тип</TableCell>
                <TableCell align="center">Цена пути (руб.)</TableCell>
                <TableCell align="center">Длина (км.)</TableCell>
                <TableCell align="center">Продукт</TableCell>
                <TableCell align="center">Цена продукта (руб.)</TableCell>
                <TableCell align="center">Выбрать?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerStore.customerSearchInfo?.map((info, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Вариант {index + 1}
                  </TableCell>
                  <TableCell align="center">
                    {info.groups_paths.map((group, idx) => (
                      <div key={idx}>
                        {group.paths
                          .map(
                            (path) =>
                              `${path.path.point_a.name} --> ${path.path.point_b.name}`,
                          )
                          .join(", ")}
                        <br />
                        <br />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    {info.groups_paths.map((group, idx) => (
                      <div key={idx}>
                        {PATH_TYPE_RUS[group.paths[0].path.type]}
                        <br />
                        <br />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    {info.groups_paths.map((group, idx) => (
                      <div key={idx}>
                        {group.paths[0].path.price}
                        <br />
                        <br />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    {info.groups_paths.map((group, idx) => (
                      <div key={idx}>
                        {group.paths[0].path.length}
                        <br />
                        <br />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    {info.groups_paths.map((group, idx) => (
                      <div key={idx}>
                        {group.product.name}
                        <br />
                        <br />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    {info.groups_paths.map((group, idx) => (
                      <div key={idx}>
                        {group.product.price}
                        <br />
                        <br />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSelectPath(info.id)}
                    >
                      Выбрать
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
});
