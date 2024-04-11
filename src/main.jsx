import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { manufacturerStore } from "@store/ManufacturerStore.js";

window.manufacturerStore = manufacturerStore;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
