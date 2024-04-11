import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { RouterContext } from "mobx-state-router";
import { MEDIA_URL, NO_PHOTO } from "@/api/constants.js";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import {
  Button,
  TextField,
  Rating,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";

export const CustomerProduct = observer(() => {
  const routerStore = useContext(RouterContext);
  const productId = parseInt(
    routerStore?.routerState?.params?.prodId ?? "0",
    10,
  );
  const [addedToCart, setAddedToCart] = useState(false);
  const [evaluation, setEvaluation] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await productsApi.customerProduct(productId);
      customerStore.setCustomerProduct(response.data);
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
    }
  }

  const handleAddToCart = async () => {
    setAddedToCart(true);
    await productsApi.addToCart({ product_id: product.id, count: 1 });
  };

  const product = customerStore.customerProduct;

  const handleSubmitReview = async () => {
    const data = { evaluation, comment };
    await customerStore.setCustomerEvaluate(data);
    setComment("");
    setEvaluation(0);
    await productsApi.postEvaluate(product.id, data);
  };

  return !product.company ? (
    <Typography variant="h6" color="error">
      Продукт не найден
    </Typography>
  ) : (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        p: 2,
        minWidth: 500,
        minHeight: 600,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.photo ? `${MEDIA_URL}${product.photo}` : `${NO_PHOTO}`}
        alt={product.name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.desription ? (
            <>
              <b>Описание:</b> {product.description}
            </>
          ) : (
            <b>Нет описания</b>
          )}
        </Typography>
        <Typography variant="body2">
          <b>Цена: </b>
          {product.price} руб.
        </Typography>
        <Typography variant="body2">
          <b>Размеры: {product.sizes}</b>
        </Typography>
        <Typography variant="body2">
          <b>Вес: {product.weight} кг</b>
        </Typography>
        <Typography variant="body2">
          <b>Доступность: </b>
          {product.is_available ? "В наличии" : "Нет в наличии"}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Button
          disabled={!product.is_can_add_to_cart || addedToCart}
          onClick={handleAddToCart}
          variant="contained"
          color="primary"
        >
          {!product.is_can_add_to_cart || addedToCart
            ? "Товар в корзине"
            : "Добавить в корзину"}
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {product.is_need_comment && (
          <>
            {" "}
            <p>Оставь отзыв:</p>
            <Rating
              name="simple-controlled"
              value={evaluation}
              onChange={(event, newValue) => setEvaluation(newValue)}
            />
            <TextField
              fullWidth
              label="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              margin="normal"
              size="medium"
            />
            <Button
              onClick={handleSubmitReview}
              variant="contained"
              color="secondary"
            >
              Оставить отзыв
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
});
