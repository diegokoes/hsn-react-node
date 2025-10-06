// Configuración del enrutador usando react-router-dom (JS)
// Sigue la guía del profesor: createBrowserRouter + objetos Route con path, element, children y loader

import Login from "@/features/auth/login/login";
import Registro from "@/features/auth/registro/registro";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./app";
import NotFound from "./routes/not-found";
import Landing from "./routes/pagina-landing";

// Router con ruta raíz (layout) y rutas anidadas
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/registro", element: <Registro /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
