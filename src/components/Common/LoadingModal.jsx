import { observer } from "mobx-react";
import { Box, CircularProgress } from "@mui/material";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { appStore } from "@store/AppStore.js";

export const LoadingModal = observer(() => {
  if (
    !manufacturerStore.ordersIsLoading &&
    !manufacturerStore.productsIsLoading &&
    !manufacturerStore.pathsIsLoading &&
    !manufacturerStore.ordersIsLoading &&
    !appStore.categoriesIsLoading &&
    !appStore.citiesIsLoading
  ) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <CircularProgress />
    </Box>
  )
})
