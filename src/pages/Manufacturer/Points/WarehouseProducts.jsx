import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import WHProductsApi from "@/api/Manufacturer/WarehouseProductsApi.js";
import { manufacturerStore } from "@store/ManufacturerStore.js";

const WarehouseProduct = ({ product, count, updateProducts, point }) => {
  const handleDelete = async () => {
    await WHProductsApi.removeProduct(point.id, product.product.id);
    await updateProducts();
  }

  return (
    <Accordion
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <AccordionSummary>
        <Typography variant="body1" gutterBottom>
          {count + 1}. {product.product.name} - {product.count}
        </Typography>
        <Button sx={{ marginLeft: "auto" }} onClick={(event) => {
          event.stopPropagation();
          handleDelete();
        }}>Удалить</Button>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1" gutterBottom>
          Описание: {product.product.description || "Отсутствует"}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const AddProductWareHouseModalContent = observer(
  ({ warehouseProducts, handleClose, updateProducts, point }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const availableProducts = manufacturerStore.products.filter((product) => {
      return !warehouseProducts.some(
        (whProduct) => whProduct.product.id === product.id,
      );
    });
    const [count, setCount] = useState(1);

    return (
      <div>
        <div>
          <Autocomplete
            id="city-autocomplete"
            options={availableProducts}
            getOptionLabel={(option) => option.name}
            value={selectedProduct}
            onChange={(event, newValue) => setSelectedProduct(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Продукт" margin="normal" />
            )}
          />
          <TextField
            id="outlined-number"
            label="Количество"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={count}
            onChange={(event) => setCount(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            onClick={async () => {
              await WHProductsApi.addProduct(
                point.id,
                selectedProduct.id,
                count,
              );
              await updateProducts();
              handleClose();
            }}
          >
            Добавить
          </Button>
          <Button onClick={handleClose}>Закрыть</Button>
        </div>
      </div>
    );
  },
);

const WarehouseProductsContent = observer(
  ({ products, loading, updateProducts, point }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    if (loading) {
      return (
        <div>
          <Typography variant="body1" gutterBottom>
            Loading...
          </Typography>
        </div>
      );
    }

    return (
      <div>
        {products.map((product, count) => (
          <WarehouseProduct key={product.id} product={product} count={count} />
        ))}
        <Button sx={{ marginTop: "10px" }} onClick={handleOpen}>
          Добавить продукт
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
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Добавление продукта на склад
            </Typography>
            <AddProductWareHouseModalContent
              warehouseProducts={products}
              handleClose={handleClose}
              updateProducts={updateProducts}
              point={point}
            />
          </Box>
        </Modal>
      </div>
    );
  },
);

export const WarehouseProducts = observer(({ point }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateProducts = async () => {
    setLoading(true);
    const response = await WHProductsApi.getProducts(point.id);
    setProducts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <div>
      <WarehouseProductsContent
        products={products}
        loading={loading}
        updateProducts={updateProducts}
        point={point}
      />
    </div>
  );
});
