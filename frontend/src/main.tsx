import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./context/ThemeContext"; // <-- import the ThemeProvider

const Main = (): void => {
  const container = document.getElementById("root");
  if (!container) throw new Error("Root element missing");

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>   {/* 👈 Global dark/light mode wrapper */}
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

Main();
