import {
  Box,
  Button, Checkbox,
  FormControl, FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CustomFileInput } from "@components/Input/CustomFileInput.jsx";
import { appStore } from "@store/AppStore.js";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import MProductsApi from "@/api/Manufacturer/MProductsApi.js";

export const ProductEditModal = ({ editProductId, setEditProductId }) => {
  if (editProductId === null) {
    return null;
  }

  const product = manufacturerStore.getProductById(editProductId);

  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    sizes: product.sizes,
    weight: product.weight,
    description: product.description,
    category: product.category,
    is_available: product.is_available,
    photo: null,
    photoName: null,
    imageValue: null,
  });

  const [isEdited, setIsEdited] = useState({
    name: false,
    price: false,
    sizes: false,
    weight: false,
    description: false,
    category: false,
    is_available: false,
    photo: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: isEdited.name ? formData.name : undefined,
      price: isEdited.price ? formData.price : undefined,
      sizes: isEdited.sizes ? formData.sizes : undefined,
      weight: isEdited.weight ? formData.weight : undefined,
      description: isEdited.description ? formData.description : undefined,
      category: isEdited.category ? formData.category : undefined,
      is_available: isEdited.is_available ? formData.is_available : undefined,
      photo: isEdited.photo ? formData.photo : undefined,
    };
    await MProductsApi.updateProduct(editProductId, data);
    setEditProductId(null);
    await manufacturerStore.updateProducts();
  }




  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsEdited((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  return <Modal open={true} onClose={() => {
    setEditProductId(null);
  }}>
    <Box
      sx={{
        position: "absolute",
        top: "55%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Изменения продукта
      </Typography>

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
          disabled
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

      <Button onClick={() => {
        setEditProductId(null);
      }}>Закрыть</Button>
    </Box>
  </Modal>;
};
