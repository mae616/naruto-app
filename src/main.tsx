import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "virtual:uno.css";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
