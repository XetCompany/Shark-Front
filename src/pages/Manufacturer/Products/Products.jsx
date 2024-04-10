import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { useRouterStore } from "mobx-state-router";
import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { RoutesEnum } from "@/router/index.jsx";
import MProductsApi from "@/api/Manufacturer/MProductsApi.js";
import { SearchCreateComponent } from "@components/PageWrapper/SearchCreateComponent.jsx";
import { observer } from "mobx-react";
import { Product } from "@components/Manufacturer/Product.jsx";

const ProductsContent = observer(({ isLoaded, products }) => {
  if (!isLoaded) {
    return (
      <Typography variant="body1">Загрузка...</Typography>
    );
  }

  if (products.length === 0) {
    return (
      <Typography variant="body1">Нет пунктов</Typography>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" style={{
      paddingTop: "16px",
    }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
});

export function ManufacturerProducts() {
  const routerStore = useRouterStore();
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const lowerCaseSearchValue = searchValue.toLowerCase();
  const filteredProducts = products.filter((product) => {
    return (
      // TODO: более сложный поиск
      product.name.toLowerCase().includes(lowerCaseSearchValue)
    );
  });

  const loadProducts = async () => {
    setIsLoaded(false);
    const response = await MProductsApi.getProducts();
    setProducts(response.data);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return <ContentPageWrapper title="Товары" componentHeader={
    <SearchCreateComponent
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      routerStore={routerStore}
      createText="Добавить товар"
      routerName={RoutesEnum.M_PRODUCTS_CREATE}
    />
  }>
    <ProductsContent isLoaded={isLoaded} products={filteredProducts} />
  </ContentPageWrapper>;
}