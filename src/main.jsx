import "./index.css";
import App from "./App";
import { StrictMode } from "react";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
);
