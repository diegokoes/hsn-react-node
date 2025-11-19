import { Link, Outlet } from "react-router-dom";
import "./account-panel.css";

export default function AccountPanel() {
  return (
    <div className="container">
      <div className="row" style={{ backgroundColor: "#ccc" }}>
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                Mi cuenta
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row m-4">
        {/* menu lateral del panel... */}
        <div className="col-3">
          <div className="list-group">
            {[
              { nombre: "Pagina principal", enlace: "/auth/account-panel/principal", icon: "fa-solid fa-house" },
              {
                nombre: "Mis datos personales",
                enlace: "/auth/account-panel/misDatosPersonales",
                icon: "fa-solid fa-user",
              },
              {
                nombre: "Libreta de direcciones",
                enlace: "/auth/account-panel/misDirecciones",
                icon: "fa-solid fa-location-dot",
              },
              { nombre: "Mis tarjetas", enlace: "/auth/account-panel/misMetodosPago", icon: "fa-solid fa-credit-card" },
              { nombre: "Mis pedidos", enlace: "/auth/account-panel/misPedidos", icon: "fa-solid fa-box" },
              { nombre: "Mis tickets", enlace: "/auth/account-panel/misTickets", icon: "fa-solid fa-message" },
              { nombre: "Mis cupones exclusivos", enlace: "/auth/account-panel/misCupones" },
              { nombre: "Mis favoritos", enlace: "/auth/account-panel/misFavoritos" },
              { nombre: "Guardados para luego", enlace: "/auth/account-panel/guardadosParaLuego" },
              { nombre: "Avisos de stock", enlace: "/auth/account-panel/avisosDeStock" },
              { nombre: "Mis opiniones de productos", enlace: "/auth/account-panel/misOpinionesProductos" },
              { nombre: "Plan Amigo", enlace: "/auth/account-panel/planAmigo" },
              { nombre: "Notificaciones", enlace: "/auth/account-panel/notificaciones" },
              { nombre: "Carritos Compartidos", enlace: "/auth/account-panel/carritosCompartidos" },
              { nombre: "Cerrar la sesion", enlace: "/auth/account-panel/cerrarSesion", icon: "fa-solid fa-power-off" },
            ].map((opcion, index) => (
              <Link
                key={index}
                href={opcion.enlace}
                className={`list-group-item list-group-item-action ${
                  window.location.href.includes(opcion.enlace) ? "active" : ""
                }`}
                aria-current={index === 0 ? "true" : "false"}
              >
                <div className="me-2 d-inline d-flex align-items-center justify-content-between">
                  {opcion.nombre} {opcion.icon && <i className={opcion.icon}></i>}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="col-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
