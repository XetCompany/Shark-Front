import ReactDOM from "react-dom/client";
import { manufacturerStore } from "@store/ManufacturerStore.js";
import { App } from "./App.jsx";
import "./index.css";

window.manufacturerStore = manufacturerStore;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
