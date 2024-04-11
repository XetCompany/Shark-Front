import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import "./Products.css";
import productsApi from "@/api/ProductsApi.js";
import { RouterContext } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";
import { customerStore } from "@store/CustomerStore.js";
import { Button } from "@components/Button/Button.jsx";
import { MEDIA_URL } from "@/api/constants.js";

export const CustomerProducts = observer(() => {
  const routerStore = useContext(RouterContext);
  const [addedToCart, setAddedToCart] = useState({
    ids: [],
  });

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

  const data = (product) => {
    return {
      product_id: product.id,
      count: 1,
    };
  };

  const handleAddToCart = async (product) => {
    const newData = data(product);
    setAddedToCart((prevAddedToCart) => ({
      ids: [...prevAddedToCart.ids, product.id],
    }));
    productsApi.addToCart(newData);
  };

  const handleProductClick = async (prodId) => {
    await routerStore.goTo(RoutesEnum.PRODUCT, { prodId: `${prodId}` });
  };

  return (
    <div className="products">
      {customerStore.customerProducts.map((product) => (
        <div key={product.id} className="product">
          <img
            src={
              product.photo
                ? `${MEDIA_URL}${product.photo}`
                : "https://www.interra-rus.com/storage/media/default.png"
            }
            width="150px"
            height="150px"
            sizes="contain"
            alt={product.name}
            className="product-photo"
          />
          <Button
            disabled={
              !product.is_can_add_to_cart ||
              addedToCart.ids.find((id) => id === product.id)
            }
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(product)}
          >
            {!product.is_can_add_to_cart ||
            addedToCart.ids.find((id) => id === product.id)
              ? "Товар в корзине"
              : "Добавить в корзину"}
          </Button>
          <div
            className="product-info"
            onClick={() => handleProductClick(product.id)}
          >
            <span>{product.price} руб.</span>
            <h3>{product.name}</h3>
            <span>Производитель: {product.company.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
});
