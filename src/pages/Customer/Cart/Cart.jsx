import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import { RouterContext } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import { Button } from "@components/Button/Button.jsx";
import "./Cart.css";

export const Cart = observer(() => {
  const routerStore = useContext(RouterContext);
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await productsApi.cart();
        customerStore.setCustomerCart(response.data);
        console.log(response.data, "Корзина загружена");
      } catch (error) {
        console.error("Ошибка при получении продуктов:", error);
      }
    }

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newCount) => {
    if (newCount < 0) {
      return;
    }

    try {
      const response = await productsApi.customerProductCount({
        product_id: productId,
        count: newCount,
      });
      if (response.status === 200 && newCount > 0) {
        const updatedCart = customerStore.customerCart.map((item) =>
          item.product.id === productId ? { ...item, count: newCount } : item,
        );
        customerStore.setCustomerCart(updatedCart);
      } else {
        return await handleRemoveFromCart(productId);
      }
      console.log(response.data, "Количество обновлено");
    } catch (error) {
      console.error("Ошибка при обновлении количества:", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await productsApi.removerFromCart(productId);
      if (response.status === 200) {
        const updatedCart = customerStore.customerCart.filter(
          (item) => item.product.id !== productId,
        );
        customerStore.setCustomerCart(updatedCart);
      }
      console.log(response.data, "Продукт удален");
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };

  const handleCreateOrder = () => {
    routerStore.goTo(RoutesEnum.CREATE_ORDER);
  };

  // ToDo: допилить итоговую цену
  // const calculateTotalPrice = () => {
  //   return customerStore.customerCart.reduce((total, item) => {
  //     return total + item.product.price * item.count;
  //   }, 0);
  // };

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
                    item.product.photo ||
                    "https://www.interra-rus.com/storage/media/default.png"
                  }
                  width="150px"
                  height="150px"
                  alt={item.product.name}
                  className="product-photo"
                />
                <div className="cart-item-details">
                  <p>{item.product.name}</p>
                  <span className="cart-item-price">
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

          {/*ToDo: допилить итоговую цену*/}
          {/*{calculateTotalPrice}*/}
          <Button onClick={handleCreateOrder}>Оформить заказ</Button>
        </ul>
      )}
    </div>
  );
});
