import { observer } from "mobx-react";
import { useContext } from "react";
import { RouterContext } from "mobx-state-router";
import { customerStore } from "@store/CustomerStore.js";
import "./Product.css";

export const CustomerProduct = observer(() => {
  const routerStore = useContext(RouterContext);
  const productId = parseInt(
    routerStore?.routerState?.options?.prodId ?? "0",
    10,
  );
  const product = customerStore.customerProducts.find(
    (product) => product.id === productId,
  );

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className="product-detail">
      <img
        src={
          product.photo ||
          "https://www.interra-rus.com/storage/media/default.png"
        }
        alt={product.name}
        width="200px"
        height="200px"
      />
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
          <p>Имя: {product.company.username}</p>
          <p>Email: {product.company.email}</p>
        </div>
        <div className="product-evaluations">
          <h3>Отзывы</h3>
          {product.evaluations.map((evaluation) => (
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
