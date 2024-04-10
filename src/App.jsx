import { RouterContext, RouterView } from "mobx-state-router";
import { Header } from "@components/Header/Header.jsx";
import { viewMap } from "./router/index.jsx";
import { Router } from "./router/Router.js";
import "./App.css";
import { Footer } from "@components/Footer/Footer.jsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  const routerStore = Router();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterContext.Provider value={routerStore}>
        <Header />
        <div className="main">
          <RouterView viewMap={viewMap} />
        </div>
        <Footer />
      </RouterContext.Provider>
    </ThemeProvider>
  );
};
