import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { UserProvider } from "./Providers/UserProvider/UserProvider.jsx";
import { AdminProvider } from "./Providers/AdminProvider/AdminProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AdminProvider>
  </React.StrictMode>
);
