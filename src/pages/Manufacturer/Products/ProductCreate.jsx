import { observer } from "mobx-react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { appStore } from "@store/AppStore.js";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import MProductsApi from "@/api/Manufacturer/MProductsApi.js";
import { RoutesEnum } from "@/router/index.jsx";
import { useRouterStore } from "mobx-state-router";
import { CustomFileInput } from "@components/Input/CustomFileInput.jsx";

const ProductCreateForm = observer(() => {
  const routerStore = useRouterStore();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sizes: "",
    weight: "",
    description: "",
    category: "",
    is_available: true,
    photo: null,
    photoName: null,
    imageValue: null,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addProduct = async (data) => {
    await MProductsApi.createProduct(data);
    await routerStore.goTo(RoutesEnum.M_PRODUCTS);
    await manufacturerStore.updateProducts();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
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
      {/* Примеры текстовых полей для формы */}
      <TextField
        name="name"
        label="Название"
        value={formData.name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <CustomFileInput
        placeholder="Выберите изображение"
        accept=".png, .jpeg, .jpg"
        fileData={formData.imageValue}
        setFileBase64={(base64) => {
          setFormData(prevState => ({
            ...prevState,
            photo: base64,
          }));
        }}
        setFileData={(data) => {
          setFormData(prevState => ({
            ...prevState,
            imageValue: data,
          }));
        }}
      />
      <TextField
        name="price"
        label="Цена"
        type="number"
        value={formData.price}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="sizes"
        label="Размеры"
        value={formData.sizes}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="weight"
        label="Вес"
        type="number"
        value={formData.weight}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="description"
        label="Описание"
        value={formData.description}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        variant="outlined"
        minRows={4}
        multiline
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Категория</InputLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={handleFormChange}
          label="Категория"
        >
          {appStore.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="is_available"
              checked={formData.is_available}
              onChange={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  is_available: !prevState.is_available,
                }))
              }
            />
          }
          label="Доступен к заказу"
        />
      </FormGroup>
      <Button type="submit" variant="contained" color="primary">
        Сохранить
      </Button>
    </form>
  );
});

export const ManufacturerProductCreate = observer(() => {
  return (
    <ContentPageWrapper title="Создание нового продукта">
      <ProductCreateForm />
    </ContentPageWrapper>
  );
});