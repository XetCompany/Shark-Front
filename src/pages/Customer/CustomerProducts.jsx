import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { RouterContext } from "mobx-state-router";
import productsApi from "@/api/ProductsApi.js";
import { RoutesEnum } from "@/router/index.jsx";
import { customerStore } from "@store/CustomerStore.js";
import { MEDIA_URL } from "@/api/constants.js";
import no_photo from "@assets/img/no_image.png";
import { SearchInput } from "@components/Input/SearchInput.jsx";

export const CustomerProducts = observer(() => {
  const routerStore = useContext(RouterContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [addedToCart, setAddedToCart] = useState({
    ids: [],
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await productsApi.customerProducts();
        customerStore.setCustomerProducts(response.data);
      } catch (error) {
        console.error("Ошибка при получении продуктов:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    setAddedToCart((prevAddedToCart) => ({
      ids: [...prevAddedToCart.ids, product.id],
    }));
    await productsApi.addToCart({ product_id: product.id, count: 1 });
  };

  const handleProductClick = (prodId) => {
    routerStore.goTo(RoutesEnum.PRODUCT, { params: { prodId: `${prodId}` } });
  };

  const filteredProducts = searchTerm
    ? customerStore.customerProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : customerStore.customerProducts;

  return (
    <Grid container spacing={3} style={{ padding: "25px 70px" }}>
      <Grid container item xs={12}>
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск по названию"
          ariaLabel="поиск по названию"
          styles={{
            borderRadius: "4px 0px 0px 4px",
          }}
        />
      </Grid>
      {filteredProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={
                product.photo ? `${MEDIA_URL}${product.photo}` : `${no_photo}`
              }
              alt={product.name}
              sx={{ objectFit: "contain", width: "100%" }}
            />
            <CardContent
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              onClick={() => handleProductClick(product.id)}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  color:
                    hoveredProductId === product.id
                      ? "primary.main"
                      : "inherit",
                  transition: "color 0.3s",
                  cursor: "pointer",
                }}
              >
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Производитель: {product.company.username}
              </Typography>
              <Typography variant="body1">{product.price} руб.</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={
                  !product.is_can_add_to_cart ||
                  addedToCart.ids.includes(product.id)
                }
                onClick={() => handleAddToCart(product)}
              >
                {!product.is_can_add_to_cart ||
                addedToCart.ids.includes(product.id)
                  ? "Товар в корзине"
                  : "Добавить в корзину"}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});
