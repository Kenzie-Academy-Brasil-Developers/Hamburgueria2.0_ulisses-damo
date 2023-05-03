import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "./styles/theme";
import App from "./App";
import { UserProvider } from "./providers/userContext";
import { CartProvider } from "./providers/cartContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ThemeProvider theme={mainTheme}>
            <App />
          </ThemeProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
