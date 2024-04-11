import { observer } from "mobx-react";
import { POINT_TYPES_RUS } from "@common/common.js";
import { appStore } from "@store/AppStore.js";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import PointsApi from "@/api/Manufacturer/PointsApi.js";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";

export const Point = observer(({ point }) => {
  const routerStore = useRouterStore();

  const handleDeletePoint = async () => {
    manufacturerStore.setPointsIsLoading(true);
    await PointsApi.deletePoint(point.id);
    await manufacturerStore.updatePoints();
  }

  return (
    <Card sx={{
      minWidth: 275,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{
          marginBottom: 1,
        }}>
          {point.name || "Без названия"}
        </Typography>
        <Typography variant="body2" component="p">
          {POINT_TYPES_RUS[point.type]} №{point.id}
        </Typography>
        <Typography variant="body2" component="p">
          {appStore.getCityNameById(point.city) || "Неизвестный город"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {
          routerStore.goTo(RoutesEnum.POINT_DETAILS, { params: { id: point.id } });
        }}>Перейти</Button>
        <Button size="small" onClick={handleDeletePoint}>Удалить</Button>
      </CardActions>
    </Card>
  );
});
