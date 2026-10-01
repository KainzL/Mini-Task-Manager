import { createElement as h, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

const root = createRoot(document.getElementById("root"));
root.render(h(StrictMode, null, h(ThemeProvider, null, h(App))));
