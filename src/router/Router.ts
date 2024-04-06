import {
  browserHistory,
  createRouterState,
  HistoryAdapter,
  RouterStore,
} from "mobx-state-router";
import { Routes } from "./index.tsx";

const notFound = createRouterState("notFound");

export const Router = () => {
  const routerStore = new RouterStore(Routes, notFound);

  // Observe history changes
  const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
  historyAdapter.observeRouterStateChanges();
  return routerStore;
};
