import React from "react";
import { createRoot } from "react-dom/client";
import App from "App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "context/auth-context";
import { Provider } from "react-redux";
import store from "store";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
