import { RouterContext, RouterView } from "mobx-state-router";
import { Header } from "@components/Header/Header.jsx";
import { viewMap } from "./router/index.jsx";
import { Router } from "./router/Router.js";
import "./App.css";
import { Footer } from "@components/Footer/Footer.jsx";

export const App = () => {
  const routerStore = Router();

  return (
    <RouterContext.Provider value={routerStore}>
      <Header />
      <div className="main">
        <RouterView viewMap={viewMap} />
      </div>
      <Footer />
    </RouterContext.Provider>
  );
};
