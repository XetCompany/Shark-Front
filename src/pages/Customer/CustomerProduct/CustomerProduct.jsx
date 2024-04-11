import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { RouterContext } from "mobx-state-router";
import { MEDIA_URL } from "@/api/constants.js";
import productsApi from "@/api/ProductsApi.js";
import { customerStore } from "@store/CustomerStore.js";
import { Button } from "@components/Button/Button.jsx";
import "./Product.css";

export const CustomerProduct = observer(() => {
  const routerStore = useContext(RouterContext);
  const productId = parseInt(
    routerStore?.routerState?.params?.prodId ?? "0",
    10,
  );
  const [addedToCart, setAddedToCart] = useState(false);

  async function fetchProducts() {
    try {
      const response = await productsApi.customerProduct(productId);
      customerStore.setCustomerProduct(response.data);
      console.log(response.data, "Продукт загружен");
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const product = customerStore.customerProduct;

  const data = (product) => {
    return {
      product_id: product.id,
      count: 1,
    };
  };

  const handleAddToCart = async (product) => {
    const newData = data(product);
    setAddedToCart(true);
    await productsApi.addToCart(newData);
  };

  return !customerStore.customerProduct.company ? (
    <div>Продукт не найден</div>
  ) : (
    <div className="product-detail">
      <img
        src={
          customerStore.customerProduct.photo
            ? `${MEDIA_URL}${customerStore.customerProduct.photo}`
            : "https://www.interra-rus.com/storage/media/default.png"
        }
        alt={customerStore.customerProduct.name}
        width="200px"
        height="200px"
      />
      <Button
        disabled={
          !customerStore.customerProduct.is_can_add_to_cart || addedToCart
        }
        className="add-to-cart-btn"
        onClick={() => handleAddToCart(product)}
      >
        {!customerStore.customerProduct.is_can_add_to_cart || addedToCart
          ? "Товар в корзине"
          : "Добавить в корзину"}
      </Button>
      <div className="product-info">
        <h1>{customerStore.customerProduct.name}</h1>
        <p>{customerStore.customerProduct.description}</p>
        <p>Цена: {customerStore.customerProduct.price} руб.</p>
        <p>Размеры: {customerStore.customerProduct.sizes}</p>
        <p>Вес: {customerStore.customerProduct.weight} кг</p>
        <p>
          Доступность:{" "}
          {customerStore.customerProduct.is_available
            ? "В наличии"
            : "Нет в наличии"}
        </p>
        <div className="company-info">
          <h3>Производитель</h3>
          <p>Имя: {customerStore.customerProduct.company.username}</p>
          <p>Email: {customerStore.customerProduct.company.email}</p>
        </div>
        <div className="product-evaluations">
          <h3>Отзывы</h3>
          {customerStore.customerProduct?.evaluations.map((evaluation) => (
            <div key={evaluation.id} className="evaluation">
              <p>Оценка: {evaluation.evaluation}</p>
              <p>Комментарий: {evaluation.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
