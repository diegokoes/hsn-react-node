import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./app/app";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppLayout />
  </StrictMode>
);
