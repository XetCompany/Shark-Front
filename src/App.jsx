import React, { useEffect } from "react";
import { RouterContext, RouterView } from "mobx-state-router";
import { RoutesEnum, viewMap } from "./router/index.jsx";
import { Router } from "./router/Router.js";
import { Header } from "@components/Header/Header.jsx";
import { Footer } from "@components/Footer/Footer.jsx";
import "./App.css";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LoadingModal } from "@components/Common/LoadingModal.jsx";
import { ErrorModal } from "@components/Common/ErrorModal.jsx";
import userStore from "@store/UserStore.js";
import errorStore from "@store/ErrorStore.js";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  const routerStore = Router();

  useEffect(() => {
    if (!userStore.accessToken) {
      errorStore.setError(null);
      routerStore.goTo(RoutesEnum.HOME);
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterContext.Provider value={routerStore}>
        <Header />
        <div className="main">
          <RouterView viewMap={viewMap} />
        </div>
        <Footer />
        <LoadingModal />
        <ErrorModal />
      </RouterContext.Provider>
    </ThemeProvider>
  );
};
