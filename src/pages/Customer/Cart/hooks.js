import { useState, useCallback, useContext } from "react";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import { RoutesEnum } from "@/router/index.jsx";
import { RouterContext } from "mobx-state-router";

export const useCart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const routerStore = useContext(RouterContext);

  const fetchCart = useCallback(async () => {
    const response = await productsApi.getCart();
    customerStore.setCustomerCart(response.data);
  }, []);

  const handleQuantityChange = useCallback(async (productId, newCount) => {
    if (newCount < 0) {
      return;
    }
    await productsApi.customerProductCount({
      product_id: productId,
      count: newCount,
    });
    if (newCount > 0) {
      const updatedCart = customerStore.customerCart.map((item) =>
        item.product.id === productId ? { ...item, count: newCount } : item,
      );
      customerStore.setCustomerCart(updatedCart);
    } else {
      await productsApi.removerFromCart(productId);
      const updatedCart = customerStore.customerCart.filter(
        (item) => item.product.id !== productId,
      );
      customerStore.setCustomerCart(updatedCart);
    }
  }, []);

  const handleCitySelect = useCallback((newValue) => {
    setSelectedCity(newValue);
    customerStore.setCustomerCurrentPath(newValue);
  }, []);

  const handleProductClick = useCallback(async (prodId) => {
    await routerStore.goTo(RoutesEnum.PRODUCT, {
      params: { prodId: `${prodId}` },
    });
  }, []);

  const handleCreateOrder = useCallback(async () => {
    const response = await productsApi.getAllPaths();
    customerStore.setCustomerAllPaths(response.data);
    if (response.status === 200) {
      setIsModalOpen(true);
    }
    console.log(response.data, "Доступные пути загружены");
  }, []);

  const handleCloseModal = useCallback(async () => {
    setIsModalOpen(false);
    await routerStore.goTo(RoutesEnum.CREATE_ORDER);
  }, []);

  const calculateTotalPrice = useCallback(() => {
    return customerStore.customerCart.reduce((total, item) => {
      const productPrice = parseFloat(item.product.price);
      return total + productPrice * item.count;
    }, 0);
  }, []);

  return {
    isModalOpen,
    selectedCity,
    fetchCart,
    handleQuantityChange,
    handleCitySelect,
    handleProductClick,
    handleCloseModal,
    calculateTotalPrice,
    handleCreateOrder,
  };
};
