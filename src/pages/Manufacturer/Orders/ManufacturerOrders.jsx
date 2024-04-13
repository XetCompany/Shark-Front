import { observer } from "mobx-react";
import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import React, { useEffect } from "react";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import {
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select, TablePagination,
  Typography,
} from "@mui/material";
import { OrderCard } from "@components/Manufacturer/OrderCard.jsx";
import { makeAutoObservable } from "mobx";
import { ORDER_STATUS, ORDER_STATUS_RUS } from "@pages/Customer/Cart/constants.js";
import { PATH_TYPES_RUS } from "@common/common.js";
import { PieChart } from "@mui/x-charts/PieChart";
import { appStore } from "@store/AppStore.js";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "./ManufacturerOrders.css";
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';


class MOrdersStore {
  filterStatuses = [
    ORDER_STATUS.AWAITING,
    ORDER_STATUS.IN_PROGRESS,
    ORDER_STATUS.ADOPTED,
    ORDER_STATUS.DECLINED,
  ];
  dateRange = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFilterStatuses(statuses) {
    this.filterStatuses = statuses;
  }

  isStatusSelected(status) {
    return this.filterStatuses.includes(status);
  }

  setDateRange(range) {
    this.dateRange = range;
  }
}

const mOrdersStore = new MOrdersStore();


const ManufacturerOrdersContent = observer(() => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredOrders = manufacturerStore.orders
    .filter(order => mOrdersStore.filterStatuses.includes(order.status))
    .filter(order => {
      if (mOrdersStore.dateRange === null) {
        return true;
      }
      const [start, end] = mOrdersStore.dateRange;
      if (!start || !end) {
        return true;
      }
      return order.created_at >= start && order.created_at <= end;
    });

  const ordersToShow = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <OrdersFilters />

      <OrdersStats filteredOrders={filteredOrders} />

      <TablePagination
        component="div"
        count={filteredOrders.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        align="center"
        rowsPerPageOptions={[6, 9, 12]}
      />

      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{
          paddingTop: "16px",
        }}
      >
        {ordersToShow.map((order) => {
          return <Grid item xs={12} sm={6} md={4} key={order.id}>
            <OrderCard order={order} />
          </Grid>;
        })}
      </Grid>
    </Container>
  );
});

const OrdersFilters = observer(() => {
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      marginBottom: "16px",
    }}>
      <Typography variant="h6" style={{ marginBottom: "16px" }}>
        Фильтры
      </Typography>
      <Container sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "16px",
      }}>
        <FormControl style={{
          width: 300,
          marginRight: "10px",
        }}>
          <InputLabel id="multiple-checkbox-label">Статусы Заказов</InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox-select"
            multiple
            value={mOrdersStore.filterStatuses}
            onChange={(event) => {
              const value = event.target.value;
              mOrdersStore.setFilterStatuses(
                typeof value === "string" ? value.split(",") : value,
              );
            }}
            renderValue={(selected) => selected.map(status => ORDER_STATUS_RUS[status]).join(", ")}
            label="Статусы Заказов"
          >
            {Object.values(ORDER_STATUS).map((type) => {
                return <MenuItem key={type} value={type}>
                  <Checkbox checked={mOrdersStore.isStatusSelected(type)} />
                  <ListItemText primary={ORDER_STATUS_RUS[type]} />
                </MenuItem>;
              },
            )}
          </Select>
        </FormControl>

        <div>
          <DateRangePicker value={mOrdersStore.dateRange} onChange={(value) => {
            mOrdersStore.setDateRange(value);
          }} />
        </div>
      </Container>
    </Container>
  );
});

const OrdersStats = observer(({ filteredOrders }) => {
  const avg_price = filteredOrders.length === 0

    ? 0
    : (filteredOrders.reduce((acc, order) => acc + order.total_price, 0) / filteredOrders.length).toFixed(2);
  const avg_count = filteredOrders.length === 0
    ? 0
    : (filteredOrders.reduce((acc, order) => acc + order.total_count, 0) / filteredOrders.length).toFixed(2);
  const avg_path_lengths = filteredOrders.length === 0
    ? 0
    : (filteredOrders.reduce((acc, order) => acc + order.total_path_length, 0) / filteredOrders.length).toFixed(2);
  const avg_path_time = filteredOrders.length === 0
    ? 0
    : (filteredOrders.reduce((acc, order) => acc + order.total_path_time, 0) / filteredOrders.length).toFixed(2);
  const avg_path_price = filteredOrders.length === 0
    ? 0
    : (filteredOrders.reduce((acc, order) => acc + order.total_path_price, 0) / filteredOrders.length).toFixed(2);

  const typePathsNums = {};
  for (const order of filteredOrders) {
    for (const groupPath of order.group_paths) {
      for (const path of groupPath.paths) {
        if (typePathsNums[path.path.type]) {
          typePathsNums[path.path.type] += 1;
        } else {
          typePathsNums[path.path.type] = 1;
        }
      }
    }
  }
  const chartTypesPathData = Object.keys(typePathsNums).map((type, num) => {
    return {
      id: num,
      label: PATH_TYPES_RUS[type],
      value: typePathsNums[type],
    };
  });

  const categoriesNums = {};
  for (const order of filteredOrders) {
    for (const product of order.products) {
      if (categoriesNums[product.product.category]) {
        categoriesNums[product.product.category] += 1;
      } else {
        categoriesNums[product.product.category] = 1;
      }
    }
  }
  const chartCategoriesData = Object.keys(categoriesNums).map((category, num) => {
    return {
      id: num,
      label: appStore.getCategoryNameById(parseInt(category)),
      value: categoriesNums[category],
    };
  });

  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      marginBottom: "16px",
      marginLeft: "26px",
    }}>
      <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "left" }}>
        Всего заказов: {filteredOrders.length}
      </Typography>
      <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "left" }}>
        Сумма заказов: {filteredOrders.reduce((acc, order) => acc + order.total_price, 0)} руб.
      </Typography>
      <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "left" }}>
        Средняя сумма заказов: {avg_price} руб.
      </Typography>
      <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "left" }}>
        Cреднее количество товаров в заказе: {avg_count} шт.
      </Typography>
      <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "left" }}>
        Средняя протяженность доставки заказов: {avg_path_lengths} км.
      </Typography>
      <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "left" }}>
        Среднее время доставки: {avg_path_time} ч.
      </Typography>
      <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "left" }}>
        Средняя стоимость доставки: {avg_path_price} руб.
      </Typography>

      <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "left" }}>
        Статистика по типам доставки товаров:
      </Typography>
      <PieChart
        series={[{
          data: chartTypesPathData,
          // arcLabel: (item) => `${item.label.slice(0, 3)}: ${item.value}`,
          // arcLabelMinAngle: 45,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        }]}
        width={500}
        height={200}
      />

      <Typography variant="h6" style={{ marginBottom: "16px", textAlign: "left" }}>
        Статистика по категориям товаров:
      </Typography>
      <PieChart
        series={[{
          data: chartCategoriesData,
          arcLabel: (item) => `${item.label}: ${item.value}`,
          arcLabelMinAngle: 45,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        }]}
        width={500}
        height={200}
      />


    </Container>
  );
});


export const ManufacturerOrders = observer(() => {
  useEffect(() => {
    manufacturerStore.loadOrders();
  }, []);

  return (
    <ContentPageWrapper title={"Заказы поставщика"}>
      <ManufacturerOrdersContent />
    </ContentPageWrapper>
  );
});
