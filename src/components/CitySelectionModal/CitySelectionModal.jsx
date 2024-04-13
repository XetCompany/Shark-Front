import React, { useContext, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Button } from "@components/Button/Button.jsx";
import { observer } from "mobx-react";
import { SORT_RUS } from "@pages/Customer/Cart/constants.js";
import { customerStore } from "@store/CustomerStore.js";
import { RoutesEnum } from "@/router/index.jsx";
import { RouterContext } from "mobx-state-router";

export const CitySelectionModal = observer(
  ({ isOpen, cities, selectedCity, onSelectCity, onClose }) => {
    const routerStore = useContext(RouterContext);
    const [sortOption, setSortOption] = useState("price");
    const [isAutomobile, setIsAutomobile] = useState(true);
    const [isRailway, setIsRailway] = useState(true);
    const [isSea, setIsSea] = useState(true);
    const [isRiver, setIsRiver] = useState(true);
    const [isAir, setIsAir] = useState(true);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [minTime, setMinTime] = useState(null);
    const [maxTime, setMaxTime] = useState(null);
    const [minDistance, setMinDistance] = useState(null);
    const [maxDistance, setMaxDistance] = useState(null);

    let options = cities.map((city) => city.city);

    const handleSubmit = async () => {
      const formData = {
        sort_by: sortOption,
        is_air: isAir,
        is_automobile: isAutomobile,
        is_railway: isRailway,
        is_river: isRiver,
        is_sea: isSea,
        max_distance: maxDistance,
        max_price: maxPrice,
        max_time: maxTime,
        min_distance: minDistance,
        min_price: minPrice,
        min_time: minPrice,
      };
      customerStore.setCustomerSorts(formData);

      onClose();
      await routerStore.goTo(RoutesEnum.CREATE_ORDER);
    };

    return (
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Выберите город доставки и параметры:
          </Typography>
          <Autocomplete
            id="city-autocomplete"
            options={options}
            getOptionLabel={(option) => option.name}
            value={selectedCity}
            onChange={(event, newValue) => onSelectCity(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Город" margin="normal" />
            )}
          />
          {!!selectedCity && (
            <>
              <TextField
                select
                label="Сортировать по"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                SelectProps={{ native: true }}
                helperText="Выберите критерий сортировки"
              >
                {["price", "time", "distance", "all"].map((value) => (
                  <option key={value} value={value}>
                    {SORT_RUS[value[0] + value.slice(1)]}
                  </option>
                ))}
              </TextField>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAutomobile}
                      onChange={(e) => setIsAutomobile(e.target.checked)}
                    />
                  }
                  label="Автомобильные"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isRailway}
                      onChange={(e) => setIsRailway(e.target.checked)}
                    />
                  }
                  label="Железнодорожные"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isSea}
                      onChange={(e) => setIsSea(e.target.checked)}
                    />
                  }
                  label="Морские"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isRiver}
                      onChange={(e) => setIsRiver(e.target.checked)}
                    />
                  }
                  label="Речные"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAir}
                      onChange={(e) => setIsAir(e.target.checked)}
                    />
                  }
                  label="Воздушные"
                />
              </FormGroup>
              <div>
                <TextField
                  label="Минимальная цена"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Максимальная цена"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                  variant="outlined"
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  label="Минимальное расстояние"
                  type="number"
                  value={minDistance}
                  onChange={(e) => setMinDistance(parseFloat(e.target.value))}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Максимальное расстояние"
                  type="number"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                  variant="outlined"
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  label="Минимальная скорость доставки"
                  type="number"
                  value={minTime}
                  onChange={(e) => setMinTime(parseFloat(e.target.value))}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Максимальная скорость доставки"
                  type="number"
                  value={maxTime}
                  onChange={(e) => setMaxTime(parseFloat(e.target.value))}
                  variant="outlined"
                  margin="normal"
                />
              </div>
              <Button onClick={!!selectedCity && handleSubmit}>
                Продолжить оформление заказа
              </Button>
            </>
          )}
        </Box>
      </Modal>
    );
  },
);
