import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRouterStore } from "mobx-state-router";
import { Grid, Typography } from "@mui/material";
import { RoutesEnum } from "@/router/index.jsx";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { ContentPageWrapper } from "@components/PageWrapper/ContentPageWrapper.jsx";
import { SearchCreateComponent } from "@components/PageWrapper/SearchCreateComponent.jsx";
import { ProductCard } from "@components/Manufacturer/ProductCard.jsx";
import { ProductEditModal } from "@components/Manufacturer/ProductEditModal.jsx";

const ProductsContent = observer(({ searchValue }) => {
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    manufacturerStore.loadProducts();
  }, []);

  if (manufacturerStore.productsIsLoading) {
    return <Typography variant="body1">Загрузка...</Typography>;
  }

  if (manufacturerStore.products.length === 0) {
    return <Typography variant="body1">Нет пунктов</Typography>;
  }

  const lowerCaseSearchValue = searchValue.toLowerCase();
  const filteredProducts = manufacturerStore.products.filter((product) => {
    return (
      // TODO: более сложный поиск
      product.name.toLowerCase().includes(lowerCaseSearchValue)
    );
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{
          paddingTop: "16px",
        }}
      >
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} editProductId={editProductId} setEditProductId={setEditProductId} />
          </Grid>
        ))}
      </Grid>
      <ProductEditModal editProductId={editProductId} setEditProductId={setEditProductId} />
    </>
  );
});

export function ManufacturerProducts() {
  const routerStore = useRouterStore();
  const [searchValue, setSearchValue] = useState("");

  return (
    <ContentPageWrapper
      title="Мои Товары"
      componentHeader={
        <SearchCreateComponent
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          routerStore={routerStore}
          createText="Добавить товар"
          routerName={RoutesEnum.M_PRODUCTS_CREATE}
        />
      }
    >
      <ProductsContent searchValue={searchValue} />
    </ContentPageWrapper>
  );
}