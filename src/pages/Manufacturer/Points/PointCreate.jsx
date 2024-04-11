import React, { useState } from "react";
import { observer } from "mobx-react";
import { useRouterStore } from "mobx-state-router";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PointsApi from "@/api/Manufacturer/PointsApi.js";
import { RoutesEnum } from "@/router/index.jsx";
import { appStore } from "@store/AppStore.js";
import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";

import { manufacturerStore } from "@store/ManufacturerStore.js";

const PointCreateForm = observer(() => {
  const routerStore = useRouterStore();
  const [formData, setFormData] = useState({
    name: "",
    type: "", // 'warehouse' or 'pickup_point' for example
    city: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addPoint = async (data) => {
    await PointsApi.addPoint(data);
    await routerStore.goTo(RoutesEnum.POINTS);
    await manufacturerStore.updatePoints();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, like sending data to backend or MobX store
    const { name, type, city } = formData;
    addPoint({ name, type, city });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "500px",
      }}
    >
      <TextField
        name="name"
        label="Название"
        value={formData.name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Тип</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleFormChange}
          label="Тип"
        >
          <MenuItem value="warehouse">Склад</MenuItem>
          <MenuItem value="pickup_point">Пункт Выдачи</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        id="city-autocomplete"
        options={appStore.cities}
        getOptionLabel={(option) => option.name}
        value={
          formData.city
            ? appStore.cities.find((city) => city.id === formData.city)
            : null
        }
        onChange={(event, newValue) => {
          setFormData({ ...formData, city: newValue ? newValue.id : "" });
        }}
        autoComplete={false}
        renderInput={(params) => (
          <TextField
            {...params}
            name="city"
            label="Город"
            margin="normal"
            variant="outlined"
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Сохранить
      </Button>
    </form>
  );
});

export const PointCreate = observer(() => {
  return (
    <ContentPageWrapper title="Создание новой точки">
      <PointCreateForm />
    </ContentPageWrapper>
  );
});


