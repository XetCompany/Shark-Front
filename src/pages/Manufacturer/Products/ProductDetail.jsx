import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { observer } from "mobx-react";
import { useRouterStore } from "mobx-state-router";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import {
  Avatar,
  Container,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { appStore } from "@store/AppStore.js";
import { MEDIA_URL } from "@/api/constants.js";
import logo from "@assets/img/no_image.png";
import React from "react";
import List from "@mui/material/List";


const Comments = ({ evaluations }) => {

  const comments = evaluations.map((evaluation, index) => {
    return (
      <ListItem key={index} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={evaluation.author.username} />
        </ListItemAvatar>
        <ListItemText
          primary={evaluation.author.username}
          secondary={
            <React.Fragment>
              <Rating name="read-only" value={evaluation.evaluation} readOnly />
              <p style={{
                margin: 0,
              }}>
                {evaluation.comment}
              </p>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  });

  const noComments = (
    <ListItem alignItems="flex-start" sx={{
      width: "100%",
      // maxWidth: 360,
      borderRadius: 2,

    }}>
      <ListItemText
        primary="Комментариев пока нет"
      />
    </ListItem>
  );

  if (comments.length === 0) {
    return noComments;
  }

  const commentsWithDividers = comments.map((comment, index) => {
    if (index === comments.length - 1) {
      return comment;
    }
    return (
      <React.Fragment key={index}>
        {comment}
        <Divider variant="inset" component="li" />
      </React.Fragment>
    );
  });

  return (
    <List sx={{
      width: "100%",
      // maxWidth: 360,
      borderRadius: 2,
    }}>
      {commentsWithDividers}
    </List>
  );

  return <List sx={{
    width: "100%",
    // maxWidth: 360,
    bgcolor: "background.paper",
  }}>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Brunch this weekend?"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Ali Connors
            </Typography>
            {" — I'll be in your neighborhood doing errands this…"}
          </React.Fragment>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Summer BBQ"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              to Scott, Alex, Jennifer
            </Typography>
            {" — Wish I could come, but I'm out of town this…"}
          </React.Fragment>
        }
      />
    </ListItem>
  </List>;
};


export const ManufacturerProductDetails = observer(() => {
  const routerStore = useRouterStore();
  const { params } = routerStore.routerState;
  const product = manufacturerStore.getProductById(parseInt(params.id));

  console.log(product);

  if (!product) {
    return (
      <ContentPageWrapper title="Информация о Продукте">
        <Container>
          <Paper>
            <Typography variant="h5" component="h1" gutterBottom>
              Продукт не найден
            </Typography>
          </Paper>
        </Container>
      </ContentPageWrapper>
    );
  }

  return (
    <ContentPageWrapper title="Информация о Продукте">
      <Container className="product-detail">
        <Paper
          sx={{
            padding: 2,
            marginBottom: 2,
          }}
        >
          <img
            src={product.photo ? `${MEDIA_URL}${product.photo}` : logo}
            alt={product.name}
            style={{
              height: 400,
              marginBottom: 10,
            }}
          />
          <Typography variant="h5" component="h1" gutterBottom>
            {product.name || "Без названия"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description || "Описание отсутствует"}
          </Typography>
          <Divider />
          <Typography variant="h6" component="h2" gutterBottom>
            Цена: {product.price} руб.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Размеры: {product.sizes || "Не указаны"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Вес: {`${product.weight} кг` || "Не указан"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Категория: {appStore.getCategoryNameById(product.category) || "Не указана"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Статус: {product.is_available ? "Доступен" : "Недоступен"}
          </Typography>
          <Divider />
          <Typography variant="h6" component="h2" gutterBottom>
            Комментарии:
          </Typography>
          <Comments evaluations={product.evaluations} />
        </Paper>
      </Container>
    </ContentPageWrapper>
  );
});