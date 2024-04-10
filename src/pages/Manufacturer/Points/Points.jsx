import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import PointsApi from "@/api/Manufacturer/PointsApi.js";
import { Point } from "@components/Manufacturer/Point.jsx";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import { SearchInput } from "@components/Input/SearchInput.jsx";
import { POINT_TYPES_RUS } from "@common/common.js";
import { appStore } from "@store/AppStore.js";
import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { SearchCreateComponent } from "@components/PageWrapper/SearchCreateComponent.jsx";

const PointsContent = observer(({ isLoaded, points }) => {
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
    <Grid container spacing={2} justifyContent="center" style={{
      paddingTop: "16px",
    }}>
      {points.map((point) => (
        <Grid item xs={12} sm={6} md={4} key={point.id}>
          <Point point={point} />
        </Grid>
      ))}
    </Grid>
  );
});

export const Points = () => {
  const routerStore = useRouterStore();
  const [points, setPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const lowerCaseSearchValue = searchValue.toLowerCase();
  const filteredPoints = points.filter((point) => {
    return (
      point.name.toLowerCase().includes(lowerCaseSearchValue) ||
      point.id.toString().includes(lowerCaseSearchValue) ||
      POINT_TYPES_RUS[point.type].toLowerCase().includes(lowerCaseSearchValue) ||
      appStore.getCityNameById(point.city).toLowerCase().includes(lowerCaseSearchValue)
    );
  });

  const loadPoints = async () => {
    setIsLoaded(false);
    const response = await PointsApi.getPoints();
    setPoints(response.data);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadPoints();
  }, []);

  return <ContentPageWrapper title="Пункты складов и ПВЗ" componentHeader={
    <SearchCreateComponent
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      routerStore={routerStore}
      createText="Добавить пункт"
      routerName={RoutesEnum.POINT_CREATE}
    />
  }>
    <PointsContent isLoaded={isLoaded} points={filteredPoints} />
  </ContentPageWrapper>
};
