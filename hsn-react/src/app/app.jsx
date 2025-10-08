import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Login from "../features/auth/login/login";
import Registro from "../features/auth/registro/registro";
import NotFound from "./rutas/404";
import Landing from "./rutas/pagina-landing";

//#region --------- LAYOUT - REACT ROUTER-DOM

function Layout() {
  return (
    <div className="app-layout d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
//#endregion
//#region --------- createBrowserRouter - RUTAS
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: (request, params) => {
      console.log(
        "ejecutando el loader antes de renderizar. ..\nrequest:",
        request,
        "\nparams:",
        params
      );
    },
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "auth",
        children: [
          { path: "login", element: <Login /> },
          { path: "registro", element: <Registro /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
//#endregion
export default function App() {
  return <RouterProvider router={router} />;
}
