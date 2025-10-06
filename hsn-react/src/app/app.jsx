import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";

// Layout principal de la aplicación. Header y Footer son constantes.
export default function AppLayout() {
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
