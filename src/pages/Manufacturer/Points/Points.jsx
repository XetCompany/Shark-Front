import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import PointsApi from "@/api/Manufacturer/PointsApi.js";
import { Point } from "@pages/Manufacturer/Points/Point.jsx";
import { Button, Container, Grid, List, Typography } from "@mui/material";
import { useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";

const PointsContent = observer(() => {
  const [points, setPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadPoints = async () => {
    setIsLoaded(false);
    const response = await PointsApi.getPoints();
    setPoints(response.data);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadPoints();
  }, []);

  if (!isLoaded) {
    return (
      <Typography variant="body1">Загрузка...</Typography>
    );
  }

  if (points.length === 0) {
    return (
      <Typography variant="body1">Нет пунктов</Typography>
    );
  }

  return (
    // <List sx={{
    //   display: "flex",
    //   flexDirection: "column",
    //   gap: 2,
    //   padding: 0,
    //   margin: 0,
    //   listStyle: "none",
    //   alignItems: "center",
    // }}>
    //   {points.map((point) => (
    //     <Point key={point.id} point={point} />
    //   ))}
    // </List>
    <Grid container spacing={2} justifyContent="center">
      {points.map((point) => (
        <Grid item xs={12} sm={6} md={4} key={point.id}>
          <Point point={point} />
        </Grid>
      ))}
    </Grid>
  );
});

// Верстка с использованием материалов из material-ui
export const Points = () => {
  const routerStore = useRouterStore();

  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <Container sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        padding: 2,
        margin: 2,
      }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Пункты складов и ПВЗ
        </Typography>
        <Button variant="contained" color="primary" onClick={() => {
          routerStore.goTo(RoutesEnum.POINT_CREATE);
        }}>
          Добавить пункт
        </Button>
      </Container>
      <PointsContent />
    </Container>
  );
};
