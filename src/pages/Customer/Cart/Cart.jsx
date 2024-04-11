import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import { RouterContext } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import { MEDIA_URL } from "@/api/constants.js";
import { Button } from "@components/Button/Button.jsx";
import CitySelectionModal from "@components/CitySelectionModal/CitySelectionModal.jsx";
import "./Cart.css";

export const Cart = observer(() => {
  const routerStore = useContext(RouterContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    async function fetchCart() {
      const response = await productsApi.getCart();
      customerStore.setCustomerCart(response.data);
      console.log(response.data, "Корзина загружена");
    }

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newCount) => {
    if (newCount < 0) {
      return;
    }

    const response = await productsApi.customerProductCount({
      product_id: productId,
      count: newCount,
    });
    if (newCount > 0) {
      const updatedCart = customerStore.customerCart.map((item) =>
        item.product.id === productId ? { ...item, count: newCount } : item,
      );
      customerStore.setCustomerCart(updatedCart);
    } else {
      return await handleRemoveFromCart(productId);
    }
    console.log(response.data, "Количество обновлено");
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await productsApi.removerFromCart(productId);
    const updatedCart = customerStore.customerCart.filter(
      (item) => item.product.id !== productId,
    );
    customerStore.setCustomerCart(updatedCart);
    console.log(response.data, "Продукт удален");
  };

  const handleCreateOrder = async () => {
    const response = await productsApi.getAllPaths();
    customerStore.setCustomerAllPaths(response.data);
    if (response.status === 200) {
      setIsModalOpen(true);
    }
    console.log(response.data, "Доступные пути загружены");
  };

  const handleCitySelect = (newValue) => {
    setSelectedCity(newValue);
    const path = customerStore.customerAllPaths.filter((p) => {
      if (p.city.id === newValue.id) {
        return p;
      }
    });
    console.log(path[0].id, "Выбранная точка");
    customerStore.setCustomerCurrentPath(path[0].id);
  };

  const handleCloseModal = async () => {
    setIsModalOpen(false);
    await routerStore.goTo(RoutesEnum.CREATE_ORDER);
  };

  const handleProductClick = async (prodId) => {
    await routerStore.goTo(RoutesEnum.PRODUCT, { prodId: `${prodId}` });
  };

  const calculateTotalPrice = () => {
    return customerStore.customerCart.reduce((total, item) => {
      const productPrice = parseFloat(item.product.price);
      return total + productPrice * item.count;
    }, 0);
  };

  return (
    <div className="cart">
      {customerStore.customerCart.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <ul>
          {customerStore.customerCart.map((item) => (
            <li key={item.product.id}>
              <div className="cart-item">
                <img
                  src={
                    item.product.photo
                      ? `${MEDIA_URL}${item.product.photo}`
                      : "https://www.interra-rus.com/storage/media/default.png"
                  }
                  width="150px"
                  height="150px"
                  alt={item.product.name}
                  className="product-photo"
                />
                <div className="cart-item-details">
                  <p onClick={() => handleProductClick(item.product.id)}>
                    {item.product.name}
                  </p>
                  <span
                    onClick={() => handleProductClick(item.product.id)}
                    className="cart-item-price"
                  >
                    {item.product.price} руб.
                  </span>
                  <div className="cart-item-quantity">
                    <Button
                      className="control-btn"
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.count + 1)
                      }
                    >
                      +
                    </Button>
                    <span className="product-count">{item.count}</span>
                    <Button
                      className="control-btn"
                      onClick={() =>
                        handleQuantityChange(item.product.id, item.count - 1)
                      }
                    >
                      -
                    </Button>
                  </div>
                  <Button
                    className="remove-from-cart"
                    onClick={() => handleRemoveFromCart(item.product.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </li>
          ))}

          <li className="cart-total">
            <span>Итоговая цена:</span>
            <span className="cart-total-price">
              {calculateTotalPrice()} руб.
            </span>
          </li>

          <Button onClick={handleCreateOrder}>Оформить заказ</Button>
          <CitySelectionModal
            isOpen={isModalOpen}
            cities={customerStore.customerAllPaths}
            selectedCity={selectedCity}
            onSelectCity={handleCitySelect}
            onClose={handleCloseModal}
          />
        </ul>
      )}
    </div>
  );
});
