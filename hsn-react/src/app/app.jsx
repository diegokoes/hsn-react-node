import AccountPanel from "@/features/auth/account-panel/account-panel";
import PersonalData from "@/features/auth/account-panel/personal-data/personal-data";
import Activation from "@/features/auth/activation/activation";
import Order from "@/features/shop/cart/cart";
import CheckoutSuccess from "@/features/shop/finalize-order/after-payment/checkout-success";
import Checkout from "@/features/shop/finalize-order/end-payment/checkout";
import ProductsCategory from "@/features/shop/products/products-category";
import useGlobalState from "@/stores/GlobalState";
import { createBrowserRouter, Outlet, redirect, RouterProvider } from "react-router-dom";
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

const logoutLoader = () => {
  const { reset } = useGlobalState.getState();
  reset();
  return redirect("/");
};
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
          {
            path: "account-panel",
            element: <AccountPanel />,
            children: [
              { path: "misdatospersonales", element: <PersonalData /> },
              {
                path: "salir",
                loader: logoutLoader,
              },
            ],
          },
        ],
      },
      {
        path: "shop/:pathCat",
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
