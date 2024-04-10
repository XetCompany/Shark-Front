import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import PointsApi from "@/api/Manufacturer/PointsApi.js";
import { Point } from "@pages/Manufacturer/Points/Point.jsx";
import { Button, Container, List, Typography } from "@mui/material";

const PointsContent = observer(() => {
  const [points, setPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadPoints = async () => {
    setIsLoaded(false);
    const response = await PointsApi.getPoints();
    if (response.statusText !== "OK") {
      return;
    }
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
    <List sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: 0,
      margin: 0,
      listStyle: "none",
      alignItems: "center",
    }}>
      {points.map((point) => (
        <Point key={point.id} point={point} />
      ))}
    </List>
  );
});

// Верстка с использованием материалов из material-ui
export const Points = () => {
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
          Пункты
        </Typography>
        <Button variant="contained" color="primary">
          Добавить пункт
        </Button>
      </Container>
      <PointsContent />
    </Container>
  );
};
