import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Point } from "@components/Manufacturer/Point.jsx";
import { Grid, Typography } from "@mui/material";
import { useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import { POINT_TYPES_RUS } from "@common/common.js";
import { appStore } from "@store/AppStore.js";
import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { SearchCreateComponent } from "@components/PageWrapper/SearchCreateComponent.jsx";
import { manufacturerStore } from "@store/ManufacturerStore.js";

const PointsContent = observer(({ searchValue }) => {
  useEffect(() => {
    manufacturerStore.loadPoints();
  }, []);

  if (manufacturerStore.pointsIsLoading) {
    return (
      <Typography variant="body1">Загрузка...</Typography>
    );
  }

  if (manufacturerStore.points.length === 0) {
    return (
      <Typography variant="body1">Нет пунктов</Typography>
    );
  }

  const lowerCaseSearchValue = searchValue.toLowerCase();
  const filteredPoints = manufacturerStore.points.filter((point) => {
    return (
      point.name.toLowerCase().includes(lowerCaseSearchValue) ||
      point.id.toString().includes(lowerCaseSearchValue) ||
      POINT_TYPES_RUS[point.type].toLowerCase().includes(lowerCaseSearchValue) ||
      appStore.getCityNameById(point.city).toLowerCase().includes(lowerCaseSearchValue)
    );
  });

  return (
    <Grid container spacing={2} justifyContent="center" style={{
      paddingTop: "16px",
    }}>
      {filteredPoints.map((point) => (
        <Grid item xs={12} sm={6} md={4} key={point.id}>
          <Point point={point} />
        </Grid>
      ))}
    </Grid>
  );
});

export const Points = observer(() => {
  const routerStore = useRouterStore();
  const [searchValue, setSearchValue] = useState("");

  return <ContentPageWrapper title="Пункты складов и ПВЗ" componentHeader={
    <SearchCreateComponent
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      routerStore={routerStore}
      createText="Добавить пункт"
      routerName={RoutesEnum.POINT_CREATE}
    />
  }>
    <PointsContent searchValue={searchValue} />
  </ContentPageWrapper>;
});
