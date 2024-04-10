import { useContext, useEffect } from "react";
import { RouterContext } from "mobx-state-router";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";

export const Cart = () => {
  const routerStore = useContext(RouterContext);
  console.log(routerStore, "1");
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await productsApi.cart();
        customerStore.setCustomerProducts(response.data);
        console.log(response.data, "Корзина загружена");
      } catch (error) {
        console.error("Ошибка при получении продуктов:", error);
      }
    }

    fetchCart();
  }, []);
  return <div className="cart"></div>;
};
