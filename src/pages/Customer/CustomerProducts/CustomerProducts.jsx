import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import "./Products.css";
import productsApi from "@/api/ProductsApi.js";
import { Button } from "@components/Button/Button.jsx";
import { RouterContext } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import { customerStore } from "@store/CustomerStore.js";

export const CustomerProducts = observer(() => {
  const routerStore = useContext(RouterContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await productsApi.customerProducts();
        customerStore.setCustomerProducts(response.data);
        console.log(response.data, "Продукты загружены");
      } catch (error) {
        console.error("Ошибка при получении продуктов:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleProductClick = async (id) => {
    await routerStore.goTo(RoutesEnum.PRODUCT, { id: id });
  };

  return (
    <div className="products">
      {customerStore.customerProducts.map((product) => (
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
          <div
            className="product-info"
            onClick={() => handleProductClick(product.id)}
          >
            <span>{product.price} руб.</span>
            <h3>{product.name}</h3>
          </div>
          <Button>Добавить в корзину</Button>
        </div>
      ))}
    </div>
  );
});
