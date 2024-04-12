import React from "react";
import { MEDIA_URL } from "@/api/constants.js";
import { Card, CardContent, Typography, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import no_photo from "@assets/img/no_image.png";

export const CartItem = ({
  item,
  onQuantityChange,
  onRemove,
  onProductClick,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        marginBottom: 2,
        width: "100%",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <img
        src={
          item.product.photo
            ? `${MEDIA_URL}${item.product.photo}`
            : `${no_photo}`
        }
        alt={item.product.name}
        style={{ width: 150, height: 150, objectFit: "cover" }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          onClick={() => onProductClick(item.product.id)}
          sx={{ cursor: "pointer" }}
        >
          {item.product.name}
        </Typography>
        <Typography
          variant="body1"
          onClick={() => onProductClick(item.product.id)}
          sx={{ cursor: "pointer" }}
        >
          {item.product.price} руб.
        </Typography>
        <Grid container alignItems="center" spacing={1}>
          <IconButton
            onClick={() => onQuantityChange(item.product.id, item.count - 1)}
            disabled={item.count <= 1}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>{item.count}</Typography>
          <IconButton
            onClick={() => onQuantityChange(item.product.id, item.count + 1)}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() => onRemove(item.product.id)}
            sx={{ marginLeft: "auto" }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
};
