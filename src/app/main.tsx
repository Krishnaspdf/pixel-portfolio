import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  // WHY: fail loudly at boot rather than rendering nothing silently.
  throw new Error("#root element not found — cannot mount PixelMon Journey.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
