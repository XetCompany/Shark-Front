import React from "react";
import { Button, Container } from "@mui/material";
import { SearchInput } from "@components/Input/SearchInput.jsx";

export function SearchCreateComponent({
  searchValue,
  setSearchValue,
  routerStore,
  createText,
  routerName,
}) {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Поиск по названию"
          ariaLabel="поиск по названию"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            routerStore.goTo(routerName);
          }}
        >
          {createText}
        </Button>
      </Container>
    </>
  );
}