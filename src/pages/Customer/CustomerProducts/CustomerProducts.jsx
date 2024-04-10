import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import "./Products.css";
import productsApi from "@/api/ProductsApi.js";
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
  //
  // const data = (product) => {
  //   return {
  //     product_id: product.id,
  //     count: count,
  //   };
  // };
  //
  // const handleAddToCart = (product) => {
  //   setCount((prevCount) => prevCount + 1);
  //   const newData = data(product);
  //   productsApi.addToCart(newData).then((r) => setCount(r.count));
  // };
  //
  // const incrementCount = (product) => {
  //   setCount((prevCount) => prevCount + 1);
  //   const newData = data(product);
  //   productsApi
  //     .customerProductCount({ newData })
  //     .then((r) => setCount(r.count));
  // };
  //
  // const decrementCount = (product) => {
  //   setCount((prevCount) => (prevCount - 1 > 0 ? prevCount - 1 : 1));
  //   const newData = data(product);
  //   productsApi
  //     .customerProductCount({ newData })
  //     .then((r) => setCount(r.count));
  // };

  const handleProductClick = async (prodId) => {
    await routerStore.goTo(RoutesEnum.PRODUCT, { prodId: `${prodId}` });
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
          {/*<AddToCartButtons*/}
          {/*  incrementCount={() => incrementCount(product)}*/}
          {/*  decrementCount={() => decrementCount(product)}*/}
          {/*  count={count}*/}
          {/*  handleAddToCart={() => handleAddToCart(product)}*/}
          {/*/>*/}
          {/*ToDo: перенести в корзину, у самих продуктов будет только одна кнопка */}
        </div>
      ))}
    </div>
  );
});
