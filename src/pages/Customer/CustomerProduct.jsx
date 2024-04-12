import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { RouterContext } from "mobx-state-router";
import { MEDIA_URL } from "@/api/constants.js";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import {
  Button,
  TextField,
  Rating,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CardActions,
  CardMedia,
  Divider,
} from "@mui/material";
import no_photo from "@assets/img/no_image.png";

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
    await productsApi.addToCart({ product_id: productId, count: 1 });
  };

  const handleSubmitReview = async () => {
    const data = { evaluation, comment };
    await customerStore.setCustomerEvaluate(data);
    setComment("");
    setEvaluation(0);
    await productsApi.postEvaluate(productId, data);
    await fetchProducts();
  };

  const product = customerStore.customerProduct;

  return !product.company ? (
    <Typography variant="h6" color="error">
      Продукт не найден
    </Typography>
  ) : (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
      <CardMedia
        component="img"
        height="240"
        image={product.photo ? `${MEDIA_URL}${product.photo}` : no_photo}
        alt={product.name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description || "Нет описания"}
        </Typography>
        <Typography variant="body2">Цена: {product.price} руб.</Typography>
        <Typography variant="body2">
          В наличии: {product.is_available ? "Да" : "Нет"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <List>
          {product.evaluations.length ? (
            <>
              <Typography variant="subtitle1">Отзывы:</Typography>
              {product.evaluations.map((evaluation) => (
                <ListItem key={evaluation.id}>
                  <ListItemAvatar>
                    <Avatar src={evaluation.author.image || no_photo} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={evaluation.author.username}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {`Оценка: ${evaluation.evaluation}`}
                        </Typography>
                        — {evaluation.comment}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </>
          ) : (
            <Typography variant="h6">Пока нет отзывов</Typography>
          )}
        </List>
      </CardContent>
      <CardActions sx={{ display: "flex", flexDirection: "column" }}>
        {product.is_need_comment && (
          <Box mb={4}>
            <Typography variant="subtitle1">
              Оставьте оценку и отзыв:
            </Typography>
            <Rating
              name="simple-controlled"
              value={evaluation}
              onChange={(event, newValue) => setEvaluation(newValue)}
            />
            <TextField
              fullWidth
              label="Добавьте комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <Button
              onClick={handleSubmitReview}
              variant="contained"
              color="primary"
            >
              Оставить отзыв
            </Button>
          </Box>
        )}
        <Button
          size="small"
          color="primary"
          disabled={!product.is_can_add_to_cart || addedToCart}
          onClick={handleAddToCart}
        >
          {addedToCart ? "В корзине" : "Добавить в корзину"}
        </Button>
      </CardActions>
    </Card>
  );
});
