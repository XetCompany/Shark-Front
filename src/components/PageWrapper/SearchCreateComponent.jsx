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
          // gap: 2,
        }}
      >
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Поиск по названию"
          ariaLabel="поиск по названию"
          styles={{
            borderRadius: "4px 0px 0px 4px",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "48px",
            borderRadius: "0px 4px 4px 0px",
          }}
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