import Activacion from "@/features/auth/activation/activacion";
import Productos from "@/features/shop/products/productos";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Login from "../features/auth/login/login";
import Registro from "../features/auth/registro/registro";
import NotFound from "./routes/404";
import Landing from "./routes/landing";

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

//#region --------- createBrowserRouter - ROUTES
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: (request, params) => {
      console.log("ejecutando el loader antes de renderizar. ..\nrequest:", request, "\nparams:", params);
    },
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "auth",
        children: [
          { path: "login", element: <Login /> },
          { path: "registro", element: <Registro /> },
          { path: "activacion", element: <Activacion /> },
        ],
      },
      {
        path: "shop/:pathCat/:nameCat",
        element: <Productos />,
        loader: async ({ request, params }) => {
          console.log(JSON.stringify(params));
          let petProducts = await fetch(`http://localhost:3000/api/Tienda/Productos?pathCat=${params.pathCat}`, {
            method: "GET",
          });
          let data = await petProducts.json();
          return data?.productos ?? [];
        },
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
//#endregion
export default function App() {
  return <RouterProvider router={router} />;
}
