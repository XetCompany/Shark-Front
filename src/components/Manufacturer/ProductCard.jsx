import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import { MEDIA_URL } from "@/api/constants.js";
import logo from "@assets/img/no_image.png";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import MProductsApi from "@/api/Manufacturer/MProductsApi.js";
import React from "react";

export function ProductCard({ product, editProductId, setEditProductId }) {
  const routerStore = useRouterStore();

  const handleDeleteProduct = async () => {
    manufacturerStore.setProductsIsLoading(true);
    await MProductsApi.deleteProduct(product.id);
    await manufacturerStore.updateProducts();
  };

  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={product.photo ? `${MEDIA_URL}${product.photo}` : logo}
        title={product.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Rating name="read-only" value={product.average_rating} precision={0.1} readOnly />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          size="small"
          onClick={() => {
            routerStore.goTo(RoutesEnum.M_PRODUCTS_DETAILS, {
              params: { id: product.id },
            });
          }}
        >
          Перейти
        </Button>
        <Button
          size="small"
          onClick={() => {
            setEditProductId(product.id);
          }}
        >
          Изменить
        </Button>
        <Button size="small" onClick={handleDeleteProduct}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}
