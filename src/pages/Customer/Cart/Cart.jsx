import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useCart } from "./hooks.js";
import { CartItem } from "./CartItem.jsx";
import { customerStore } from "@store/CustomerStore.js";
import CitySelectionModal from "@components/CitySelectionModal/CitySelectionModal.jsx";
import { Button } from "@components/Button/Button.jsx";
import "./Cart.css";

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
    <div className="cart">
      {customerStore.customerCart.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <ul>
          {customerStore.customerCart.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleQuantityChange}
              onProductClick={handleProductClick}
            />
          ))}

          <li className="cart-total">
            <span>Итоговая цена:</span>
            <span className="cart-total-price">
              {calculateTotalPrice()} руб.
            </span>
          </li>
          <Button onClick={handleCreateOrder}>Оформить заказ</Button>
        </ul>
      )}
      <CitySelectionModal
        isOpen={isModalOpen}
        cities={customerStore.customerAllPaths}
        selectedCity={selectedCity}
        onSelectCity={handleCitySelect}
        onClose={handleCloseModal}
      />
    </div>
  );
});
