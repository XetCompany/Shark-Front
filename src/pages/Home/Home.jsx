import React from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
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
          py: 35,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom component="h1">
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
      <Grid
        container
        spacing={2}
        sx={{ p: 3, alignItems: "center", backgroundColor: "secondary.main" }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Доставка товаров потребителям
          </Typography>
          <Typography>
            Компании могут использовать нашу платформу для эффективной доставки
            своих готовых товаров покупателям, организуя маршруты между
            складами, магазинами и пунктами выдачи. Покупатели могут легко
            заказать доставку товаров в ближайший пункт выдачи.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ShoppingCartIcon color="primary" sx={{ fontSize: 50 }} />
            <Typography variant="h5">Склады</Typography>
            <Typography>
              Хранение товаров на складах в ожидании заказов на доставку
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Third Section */}
      <Box
        sx={{ bgcolor: "#3788d8", color: "#fff", p: 3, textAlign: "center" }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">О сервисе Shark Cat:</Typography>
          <Paper
            sx={{
              maxWidth: 600,
              my: 4,
              minHeight: 400,
              padding: 10,
            }}
            elevation={3}
          >
            <Typography align="center" variant="h5" gutterBottom>
              Доставка по всему миру
            </Typography>
            <Typography align="left">
              Shark Cat специализируется на организации быстрой и
              <br />
              удобной доставки готовых изделий
              <br />
              от производителей до покупателей.
              <br />
              Мы работаем с производителями со всего мира, помогая им
              оптимизировать логистику и
              <br />
              сократить расходы на доставку.
              <br /> А покупатели получают возможность быстро и
              <br />
              просто заказывать готовые изделия из любой точки мира.
            </Typography>
          </Paper>
          <Button variant="contained" sx={{ mt: 2 }}>
            Узнать больше
          </Button>
        </Container>
      </Box>

      {/* Fourth Section */}
      <Box sx={{ py: 6, bgcolor: "background.default" }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Основные возможности
          </Typography>
          <Typography gutterBottom>
            Мы предлагаем несколько ключевых возможностей для эффективной
            доставки вашей продукции.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                <LocalShippingIcon color="primary" sx={{ fontSize: 50 }} />
                <Typography variant="h5">Оптимизация маршрутов</Typography>
                <Typography>
                  Наша система логистики позволяет находить оптимальные
                  <br />
                  маршруты для доставки, сокращая время и стоимость.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                <ShoppingCartIcon color="primary" sx={{ fontSize: 50 }} />
                <Typography variant="h5">Прозрачное ценообразование</Typography>
                <Typography>
                  Полная прозрачность в ценообразовании без скрытых
                  <br />
                  сборов и дополнительных расходов.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          p: 3,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Удобство и доступность
          </Typography>
          <Typography>
            Предоставляем максимальное удобство при заказе через нашу
            <br />
            веб-платформу, с мгновенным подтверждением заказа и трекингом.
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            Исследовать сервисы
          </Button>
        </Container>
      </Box>
    </Box>
  );
};
