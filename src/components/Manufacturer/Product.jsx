import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { MEDIA_URL } from "@/api/constants.js";
import { useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import logo from "@assets/img/no_image.png";

export function Product({ product }) {
  const routerStore = useRouterStore();

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
        <Typography variant="body2">{product.price} руб.</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button size="small" onClick={() => {
          routerStore.goTo(RoutesEnum.M_PRODUCTS_DETAILS, { params: { id: product.id } })
        }}>Перейти</Button>
        <Button size="small">Удалить</Button>
      </CardActions>
    </Card>
  );
}
