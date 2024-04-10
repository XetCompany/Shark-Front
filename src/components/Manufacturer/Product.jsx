import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { MEDIA_URL } from "@/api/constants.js";

export function Product({product}) {
  // {
  //   "id": 1,
  //   "name": "Samsung",
  //   "photo": null,
  //   "price": "0.00",
  //   "sizes": null,
  //   "weight": "0.00",
  //   "description": null,
  //   "is_available": true,
  //   "category": 1,
  //   "evaluations": []
  // },

  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={product.photo ? `${MEDIA_URL}${product.photo}` : "https://media.moddb.com/images/articles/1/73/72743/image_error_full.png"}
        title={product.name}
      />
      <CardContent>
        {/*<Image src= alt={product.name} />*/}
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2">
          {product.price} руб.
        </Typography>
      </CardContent>
      <CardActions sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button size="small">Перейти</Button>
        <Button size="small">Удалить</Button>
      </CardActions>
    </Card>
  )
}