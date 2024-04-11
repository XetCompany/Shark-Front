import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { SearchCreateComponent } from "@components/PageWrapper/SearchCreateComponent.jsx";
import { RoutesEnum } from "@/router/index.jsx";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { Box, Button, Container, Link, Modal, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouterStore } from "mobx-state-router";
import { GRID_DEFAULT_LOCALE_TEXT_RUS, PATH_TYPES_RUS } from "@common/common.js";
import DownloadIcon from "@mui/icons-material/Download";
import PublishIcon from "@mui/icons-material/Publish";
import { EXCEL_PATHS_PATTERN_URL } from "@/api/constants.js";
import { CustomFileInput } from "@components/Input/CustomFileInput.jsx";
import WHProductsApi from "@/api/Manufacturer/WarehouseProductsApi.js";
import PathsApi from "@/api/Manufacturer/PathsApi.js";

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

  const [dataFile64, setDataFile64] = useState(null);
  const [dataFile, setDataFile] = useState(null);

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
        >
          <Container sx={{
            display: "flex",
            justifyContent: "center",
          }} />
        </SearchCreateComponent>
      }
    >
      <Container sx={{
        marginTop: 2,
      }}>
        <PathContent searchValue={searchValue} />
        <PathExcel dataFile64={dataFile64} setDataFile64={setDataFile64} dataFile={dataFile} setDataFile={setDataFile} />
      </Container>
    </ContentPageWrapper>
  );
});

const PathExcel = observer(({ dataFile64, setDataFile64, dataFile, setDataFile }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return <Stack direction="row" spacing={2} sx={{
    marginTop: 2,
  }}>
    <Link href={EXCEL_PATHS_PATTERN_URL} target="_blank" download>
      <Button variant="outlined" startIcon={<DownloadIcon />}>
        Шаблон
      </Button>
    </Link>
    <Button variant="contained" startIcon={<PublishIcon />} onClick={() => {
      handleOpen();
    }}>
      Загрузить
    </Button>

    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Загрузка таблицы
        </Typography>
        <CustomFileInput
          placeholder="Выберите таблицу"
          accept=".xlsx"
          fileData={dataFile}
          setFileBase64={setDataFile64}
          setFileData={setDataFile}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            onClick={async () => {
              await PathsApi.uploadExcelFile(dataFile64);
              await manufacturerStore.updatePaths();
              handleClose();
            }}
          >
            Загрузить
          </Button>
          <Button onClick={handleClose}>Закрыть</Button>
        </div>
      </Box>
    </Modal>
  </Stack>;
});
