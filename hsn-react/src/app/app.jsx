import Activation from "@/features/auth/activation/activation";
import Order from "@/features/shop/cart/cart";
import Checkout from "@/features/shop/finalize-order/FinPedidoComp/checkout";
import CheckoutSuccess from "@/features/shop/finalize-order/after-payment/checkout-success";
import ProductsCategory from "@/features/shop/products/products-category";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Login from "../features/auth/login/login";
import Registration from "../features/auth/registration/registration";
import Landing from "../features/shop/landing/landing";
import NotFound from "./routes/404";

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
          { path: "registro", element: <Registration /> },
          { path: "activation", element: <Activation /> },
        ],
      },
      {
        path: "shop/:pathCat/:nameCat",
        element: <ProductsCategory />,
        loader: async ({ request, params }) => {
          console.log(JSON.stringify(params));
          let petProducts = await fetch(`http://localhost:3000/api/shop/products?pathCat=${params.pathCat}`, {
            method: "GET",
          });
          let data = await petProducts.json();
          return data?.productos ?? [];
        },
        children: [
          { path: "orders/current-order", element: <Order /> },
          {
            path: "orders/finish-order",
            element: <Checkout />,
            children: [{ path: "success", element: <CheckoutSuccess /> }],
          },
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
