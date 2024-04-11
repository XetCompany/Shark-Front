import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useCart } from "./hooks.js";
import { CartItem } from "./CartItem.jsx";
import { customerStore } from "@store/CustomerStore.js";
import { Button, Box, List, ListItem, Typography } from "@mui/material";
import { CitySelectionModal } from "@components/CitySelectionModal/CitySelectionModal.jsx";

export const Cart = observer(() => {
  const {
    isModalOpen,
    selectedCity,
    fetchCart,
    handleQuantityChange,
    handleCitySelect,
    handleCreateOrder,
    calculateTotalPrice,
    handleCloseModal,
    handleProductClick,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <Box
      sx={{ margin: "40px 0 35px", display: "flex", justifyContent: "center" }}
    >
      {customerStore.customerCart.length === 0 ? (
        <Typography>Ваша корзина пуста.</Typography>
      ) : (
        <List
          sx={{
            width: "90vw",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 1,
            padding: 2,
          }}
        >
          {customerStore.customerCart.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleQuantityChange}
              onProductClick={handleProductClick}
            />
          ))}
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: 1,
              borderColor: "divider",
              paddingBottom: 1,
            }}
          >
            <Typography>Итоговая цена:</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {calculateTotalPrice()} руб.
            </Typography>
          </ListItem>
          <ListItem
            sx={{ display: "flex", justifyContent: "center", paddingTop: 2 }}
          >
            <Button variant="contained" onClick={handleCreateOrder}>
              Оформить заказ
            </Button>
          </ListItem>
        </List>
      )}
      <CitySelectionModal
        isOpen={isModalOpen}
        cities={customerStore.customerAllPaths}
        selectedCity={selectedCity}
        onSelectCity={handleCitySelect}
        onClose={handleCloseModal}
      />
    </Box>
  );
});
