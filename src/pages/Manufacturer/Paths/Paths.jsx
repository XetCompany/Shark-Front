import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { SearchCreateComponent } from "@components/PageWrapper/SearchCreateComponent.jsx";
import { RoutesEnum } from "@/router/index.jsx";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouterStore } from "mobx-state-router";
import { GRID_DEFAULT_LOCALE_TEXT_RUS, PATH_TYPES_RUS } from "@common/common.js";

const PathContent = observer(({ searchValue }) => {
  useEffect(() => {
    manufacturerStore.loadPaths();
  }, []);

  if (manufacturerStore.pathsIsLoading) {
    return <Typography variant="body1">Загрузка...</Typography>;
  }

  if (manufacturerStore.paths.length === 0) {
    return <Typography variant="body1">Нет маршрутов</Typography>;
  }

  const lowerCaseSearchValue = searchValue.toLowerCase();
  const filteredPaths = manufacturerStore.paths.filter((path) => {
    return (
      // TODO: более сложный поиск
      path.point_a.name.toLowerCase().includes(lowerCaseSearchValue) ||
      path.point_b.name.toLowerCase().includes(lowerCaseSearchValue) ||
      PATH_TYPES_RUS[path.type].toLowerCase().includes(lowerCaseSearchValue)
    );
  });

  const columns = [
    { field: "point_a", headerName: "Точка А", width: 170, valueGetter: (value, row) => row.point_a.name },
    { field: "point_b", headerName: "Точка Б", width: 170, valueGetter: (value, row) => row.point_b.name },
    { field: "type", headerName: "Тип транспортировки", width: 200, valueGetter: (value) => PATH_TYPES_RUS[value] },
    { field: "time", headerName: "Время(в часах)", width: 120 },
    { field: "price", headerName: "Цена(в руб.)", width: 140 },
    { field: "length", headerName: "Протяженность(в км.)", width: 180 },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={filteredPaths}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        localeText={GRID_DEFAULT_LOCALE_TEXT_RUS}
      />
    </div>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Начальная точка</TableCell>
    //         <TableCell align="right">Конечная точка</TableCell>
    //         <TableCell align="right">Время(в часах)</TableCell>
    //         <TableCell align="right">Цена(в руб.)</TableCell>
    //         <TableCell align="right">Протяженность(в км.)</TableCell>
    //         <TableCell align="right">Тип транспортировки</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {filteredPaths.map((row) => (
    //         <TableRow
    //           key={row.name}
    //           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //         >
    //           <TableCell component="th" scope="row">
    //             {row.point_a.name}
    //           </TableCell>
    //           <TableCell align="right">{row.point_b.name}</TableCell>
    //           <TableCell align="right">{row.time}</TableCell>
    //           <TableCell align="right">{row.price}</TableCell>
    //           <TableCell align="right">{row.length}</TableCell>
    //           <TableCell align="right">{PATH_TYPES_RUS[row.type]}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
});

export const Paths = observer(() => {
  const routerStore = useRouterStore();
  const [searchValue, setSearchValue] = useState("");

  return (
    <ContentPageWrapper
      title="Маршруты"
      componentHeader={
        <SearchCreateComponent
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          routerStore={routerStore}
          createText="Добавить путь"
          routerName={RoutesEnum.PATH_CREATE}
        />
      }
    >
      <Container sx={{
        marginTop: 2,
      }}>
        <PathContent searchValue={searchValue} />
      </Container>
    </ContentPageWrapper>
  );
});
