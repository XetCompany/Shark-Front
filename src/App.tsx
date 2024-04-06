import { FC } from "react";
import { RouterContext, RouterView } from "mobx-state-router";
import { Header } from "@components/Header/Header.tsx";
import { viewMap } from "./router";
import { Router } from "./router/Router.ts";
import "./App.css";

export const App: FC = () => {
  const routerStore = Router();

  return (
    <RouterContext.Provider value={routerStore}>
      <Header />
      <RouterView viewMap={viewMap} />
    </RouterContext.Provider>
  );
};
