import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Card,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const Home = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* First Section */}
      <Box
        sx={{
          backgroundImage:
            'url("https://cdn.dorik.com/661154201d6c29001119b9a0/images/photo-1614086138082-8f9f4bed81e4-JAyyF.jpeg")',
          backgroundSize: "cover",
          color: "#fff",
          py: 20,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom>
            Эффективная доставка товаров
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowRightIcon />}
            sx={{ mt: 2 }}
          >
            Узнать больше
          </Button>
        </Container>
      </Box>

      {/* Second Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Доставка товаров потребителям
            </Typography>
            <Typography>
              Компании могут использовать нашу платформу для эффективной
              доставки своих готовых товаров покупателям, организуя маршруты
              между складами, магазинами и пунктами выдачи.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper elevation={6} sx={{ p: 3, width: "100%", maxWidth: 360 }}>
              <ShoppingCartIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5">Склады</Typography>
              <Typography>
                Хранение товаров на складах в ожидании заказов на доставку
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Third Section */}
      <Box sx={{ bgcolor: "#3788d8", py: 8 }}>
        <Container>
          <Typography variant="h4" color="common.white" gutterBottom>
            О сервисе Shark Cat:
          </Typography>
          <Paper
            elevation={6}
            sx={{ p: 4, bgcolor: "common.white", color: "black" }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Доставка по всему миру
            </Typography>
            <Typography>
              Shark Cat специализируется на организации быстрой и удобной
              доставки готовых изделий от производителей до покупателей. Мы
              работаем с производителями со всего мира, помогая им
              оптимизировать логистику и сократить расходы на доставку.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button variant="contained" sx={{ bgcolor: "primary.main" }}>
                Узнать больше
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Fourth Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Основные возможности
        </Typography>
        <Typography gutterBottom>
          Мы предлагаем несколько ключевых возможностей для эффективной доставки
          вашей продукции.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <LocalShippingIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5">Оптимизация маршрутов</Typography>
              <Typography>
                Наша система логистики позволяет находить оптимальные маршруты
                для доставки, сокращая время и стоимость.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <ShoppingCartIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5">Прозрачное ценообразование</Typography>
              <Typography>
                Полная прозрачность в ценообразовании без скрытых сборов и
                дополнительных расходов.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
