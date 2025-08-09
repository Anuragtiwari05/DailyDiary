import React from "react";
import ReactDOM from "react-dom/client"; // Must use client for React 18+
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "/context/userContext"; // Use relative path
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
