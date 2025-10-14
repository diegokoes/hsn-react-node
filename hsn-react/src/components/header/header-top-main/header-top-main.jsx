import { Link } from "react-router-dom";
import styles from "./header-top-main.module.css";

export default function HeaderTopMain() {
  return (
    <div
      className={`header-top-main border-bottom py-1 ${styles["header-top-main-sm"]}`}
      style={{ background: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row align-items-center gx-2 header-top">
          <div className="col-auto">
            <div className="header_tagline">
              <a
                href="https://www.hsnstore.com/gastos-de-envio"
                className={styles["header-top-main-link"]}
              >
                Envío gratuito a partir de 29,99€*
              </a>
            </div>
          </div>

          <div className="col-auto">
            <div className="header_top_tel_info">
              <a
                href="https://www.hsnstore.com/contacts"
                className={styles["header-top-main-link"]}
              >
                Contacta con nosotros aquí
              </a>
            </div>
          </div>

          <div className="col-auto ms-auto d-flex align-items-center gap-2">
            <div className="header_language_selector">
              <a
                href="#"
                aria-label="Cambiar país o moneda"
                className={styles["header-top-main-link"]}
              >
                <img
                  id="shipToCountryFlag"
                  src="https://www.hsnstore.com/media/flags/flag_hsnes.jpg"
                  alt="ES"
                  className={styles["header-top-main-flag"]}
                />
                <span style={{ verticalAlign: "middle" }}>ES - EUR</span>
              </a>
            </div>

            <div className="header_login">
              <ul className="list-inline mb-0 header_login_box">
                <li className="list-inline-item">
                  <Link
                    to="/auth/login"
                    className={styles["header-top-main-link"]}
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="list-inline-item" style={{ color: "#999999" }}>
                  |
                </li>
                <li className="list-inline-item">
                  <Link
                    to="/auth/registro"
                    className={styles["header-top-main-link"]}
                  >
                    Crear cuenta
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
