import React, { useState } from "react";
import { observer } from "mobx-react";
import { useRouterStore } from "mobx-state-router";
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { RoutesEnum } from "@/router/index.jsx";
import { appStore } from "@store/AppStore.js";
import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";

import { manufacturerStore } from "@store/ManufacturerStore.js";
import PathsApi from "@/api/Manufacturer/PathsApi.js";

const PathCreateForm = observer(() => {
  const routerStore = useRouterStore();
  const [formData, setFormData] = useState({
    point_a: "",
    point_b: "",
    time: "",
    price: "",
    length: "",
    type: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addPath = async (data) => {
    await PathsApi.createPath(data);
    await routerStore.goTo(RoutesEnum.PATHS);
    await manufacturerStore.updatePaths();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, like sending data to backend or MobX store
    addPath(formData);
  };

  // class PathType(models.TextChoices):
  //     AUTOMOBILE = 'automobile', 'Автомобильный'
  //     RAILWAY = 'railway', 'Железнодорожный'
  //     SEA = 'sea', 'Морской'
  //     RIVER = 'river', 'Речной'
  //     AIR = 'air', 'Воздушный'

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
      <Autocomplete
        id="point-a-city-autocomplete"
        options={appStore.cities}
        getOptionLabel={(option) => option.name}
        value={
          formData.point_a
            ? appStore.cities.find((city) => city.id === formData.point_a)
            : null
        }
        onChange={(event, newValue) => {
          setFormData({ ...formData, point_a: newValue ? newValue.id : "" });
        }}
        autoComplete={false}
        renderInput={(params) => (
          <TextField
            {...params}
            name="point_a"
            label="Точка А"
            margin="normal"
            variant="outlined"
          />
        )}
      />
      <Autocomplete
        id="point-b-city-autocomplete"
        options={appStore.cities}
        getOptionLabel={(option) => option.name}
        value={
          formData.point_b
            ? appStore.cities.find((city) => city.id === formData.point_b)
            : null
        }
        onChange={(event, newValue) => {
          setFormData({ ...formData, point_b: newValue ? newValue.id : "" });
        }}
        autoComplete={false}
        renderInput={(params) => (
          <TextField
            {...params}
            name="point_b"
            label="Точка Б"
            margin="normal"
            variant="outlined"
          />
        )}
      />
      <TextField
        name="time"
        label="Время в пути(в часах)"
        type="number"
        value={formData.time}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="price"
        label="Цена(в руб.)"
        type="number"
        value={formData.price}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="length"
        label="Протяженность(в км.)"
        type="number"
        value={formData.length}
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
          <MenuItem value="automobile">Автомобильный</MenuItem>
          <MenuItem value="railway">Железнодорожный</MenuItem>
          <MenuItem value="sea">Морской</MenuItem>
          <MenuItem value="river">Речной</MenuItem>
          <MenuItem value="air">Воздушный</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Сохранить
      </Button>
    </form>
  );
});

export const PathCreate = observer(() => {
  return (
    <ContentPageWrapper title="Создание нового маршрута">
      <PathCreateForm />
    </ContentPageWrapper>
  );
});
