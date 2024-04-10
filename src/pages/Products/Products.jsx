import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import "./Products.css";
import productsApi from "@/api/ProductsApi.js";
import { Button } from "@components/Button/Button.jsx";
import { RouterLink } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";

export const Products = observer(() => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await productsApi.customerProducts();
        setProducts(response.data);
        console.log(response.data, "Продукты загружены");
      } catch (error) {
        console.error("Ошибка при получении продуктов:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img
            src={
              product.photo ||
              "https://www.interra-rus.com/storage/media/default.png"
            }
            width="150px"
            height="150px"
            alt={product.name}
            className="product-photo"
          />
          <div className="product-info">
            <span>{product.price} руб.</span>
            <h3>{product.name}</h3>
          </div>
          <Button>
            <RouterLink routeName={RoutesEnum.PRODUCT}>
              Добавить в корзину
            </RouterLink>
          </Button>
        </div>
      ))}
    </div>
  );
});
