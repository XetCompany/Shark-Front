import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { RouterContext } from "mobx-state-router";
import { customerStore } from "@store/CustomerStore.js";
import productsApi from "@/api/ProductsApi.js";
import "./Product.css";
import { Button } from "@components/Button/Button.jsx";
import { MEDIA_URL } from "@/api/constants.js";

export const CustomerProduct = observer(() => {
  const routerStore = useContext(RouterContext);
  const productId = parseInt(
    routerStore?.routerState?.options?.prodId ?? "0",
    10,
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await productsApi.customerProduct(productId);
        customerStore.setCustomerProduct(response.data);
        console.log(response.data, "Продукт загружен");
      } catch (error) {
        console.error("Ошибка при получении продуктов:", error);
      }
    }

    fetchProducts();
  }, []);

  const product = customerStore.customerProduct;

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  const data = {
    product_id: product.id,
    count: 1,
  };

  const handleAddToCart = () => {
    productsApi.addToCart(data);
  };

  return (
    <div className="product-detail">
      <img
        src={
          product.photo
            ? `${MEDIA_URL}${product.photo}`
            : "https://www.interra-rus.com/storage/media/default.png"
        }
        alt={product.name}
        width="200px"
        height="200px"
      />
      <Button
        disabled={!product.is_can_add_to_cart}
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        {!product.is_can_add_to_cart ? "Товар в корзине" : "Добавить в корзину"}
      </Button>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Цена: {product.price} руб.</p>
        <p>Размеры: {product.sizes}</p>
        <p>Вес: {product.weight} кг</p>
        <p>
          Доступность: {product.is_available ? "В наличии" : "Нет в наличии"}
        </p>
        <div className="company-info">
          <h3>Производитель</h3>
          {/*  <p>Имя: {product.company.username}</p>*/}
          {/*  <p>Email: {product.company.email}</p>*/}
          {/*</div>*/}
          {/*<div className="product-evaluations">*/}
          {/*  <h3>Отзывы</h3>*/}
          {/*  {product?.evaluations.map((evaluation) => (*/}
          {/*    <div key={evaluation.id} className="evaluation">*/}
          {/*      <p>Оценка: {evaluation.evaluation}</p>*/}
          {/*      <p>Комментарий: {evaluation.comment}</p>*/}
          {/*    </div>*/}
          {/*  ))}*/}
        </div>
      </div>
    </div>
  );
});
