import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./features/auth/login/login";
import Registro from "./features/auth/registro/registro";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Registro />
    <Login />
  </StrictMode>
);
