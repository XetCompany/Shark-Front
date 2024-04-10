import { observer } from "mobx-react";
import { POINT_TYPES_RUS } from "@common/common.js";
import { appStore } from "@store/AppStore.js";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export const Point = observer(({ point }) => {
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
        <Button size="small" onClick={() => appStore.deletePoint(point.id)}>Удалить</Button>
      </CardActions>
    </Card>
  );
});
