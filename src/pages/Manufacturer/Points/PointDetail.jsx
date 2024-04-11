import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { POINT_TYPES, POINT_TYPES_RUS } from "@common/common.js";
import { useRouterStore } from "mobx-state-router";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { Container, Divider, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { appStore } from "@store/AppStore.js";
import "./PointDetail.css";
import { WarehouseProducts } from "@pages/Manufacturer/Points/WarehouseProducts.jsx";

export const PointDetail = observer(() => {
  const routerStore = useRouterStore();
  const { params } = routerStore.routerState;
  const point = manufacturerStore.getPointById(parseInt(params.id));

  if (!point) {
    return (
      <ContentPageWrapper title="Информация о Точке">
        <Container>
          <Paper>
            <Typography variant="h5" component="h1" gutterBottom>
              Точка не найдена
            </Typography>
          </Paper>
        </Container>
      </ContentPageWrapper>
    );
  }
  // {appStore.getCityNameById(point.city) || "Неизвестный город"}

  return (
    <ContentPageWrapper title="Информация о Точке">
      <Container className="point-detail">
        <Paper sx={{
          padding: 2,
          marginBottom: 2,
        }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {point.name || "Без названия"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Тип: {POINT_TYPES_RUS[point.type]}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Город: {appStore.getCityNameById(point.city) || "Неизвестный город"}
          </Typography>

          {point.type === POINT_TYPES.WAREHOUSE && (
            <>
              <Divider />
              <Typography variant="h6" component="h2" gutterBottom>
                Продукты склада
              </Typography>
              <WarehouseProducts point={point} />
            </>
          )}
        </Paper>
      </Container>
    </ContentPageWrapper>
  );
});