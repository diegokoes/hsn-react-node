import useGlobalState from "@/stores/GlobalState";
import { Link } from "react-router-dom";
import "./header-top-main.css";

export default function HeaderTopMain() {
  const { clientData } = useGlobalState();

  return (
    <div className={`header-top-main border-bottom py-1 header-top-main-sm`} style={{ background: "#f8f9fa" }}>
      <div className="container">
        <div className="row align-items-center gx-2 header-top">
          <div className="col-auto">
            <div className="header_tagline">
              <a href="https://www.hsnstore.com/gastos-de-envio" className="header-top-main-link">
                Envío gratuito a partir de 29,99€*
              </a>
            </div>
          </div>

          <div className="col-auto">
            <div className="header_top_tel_info">
              <a href="https://www.hsnstore.com/contacts" className="header-top-main-link">
                Contacta con nosotros aquí
              </a>
            </div>
          </div>

          <div className="col-auto ms-auto d-flex align-items-center gap-2">
            <div className="header_language_selector">
              <a href="#" className="header-top-main-link">
                <img
                  id="shipToCountryFlag"
                  src="https://www.hsnstore.com/media/flags/flag_hsnes.jpg"
                  alt="ES"
                  className="header-top-main-flag"
                />
                <span style={{ verticalAlign: "middle" }}>ES - EUR</span>
              </a>
            </div>
            {clientData && clientData.nombre ? (
              <>
                <div className="header_login">
                  <ul className="list-inline mb-0 header_login_box">
                    <li className="list-inline-item">
                      <span className="header-top-main-link">Hola, {clientData.nombre}</span>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>Hola, {clientData.nombre}</span>
                  </button>
                  <ul className="dropdown-menu">
                    {[
                      "Mis datos personales",
                      "Mis Pedidos",
                      "Mis Tickets",
                      "Plan Ahorro",
                      "Libreta de direcciones",
                      "Guardados para luego",
                      "Mis favoritos",
                      "Puntos HSN",
                      "Plan Amigo",
                      "SALIR",
                    ].map((item, pos) => (
                      <li key={pos}>
                        <a
                          className="dropdown-item"
                          href={`/auth/account-panel/${item.replace(/\s+/g, "").toLowerCase()}`}
                        >
                          <span style={{ fontSize: "0.9em" }}>{item}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="header_login">
                <ul className="list-inline mb-0 header_login_box">
                  <li className="list-inline-item">
                    <Link to="/auth/login" className="header-top-main-link">
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className="list-inline-item" style={{ color: "#999999" }}>
                    |
                  </li>
                  <li className="list-inline-item">
                    <Link to="/auth/registro" className="header-top-main-link">
                      Crear cuenta
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
