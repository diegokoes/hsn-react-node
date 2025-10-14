export default function Navigation() {
  return (
    <div
      className="navigation border-top border-bottom"
      style={{ background: "#ffffff" }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg py-0" aria-label="Primary">
          <div className="container-fluid px-0">
            <a
              className="navbar-brand d-none d-lg-block"
              href="#"
              aria-hidden="true"
            >
              &nbsp;
            </a>

            <div className="collapse navbar-collapse show" id="mainMenu">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="pronav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Nutrición Deportiva
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Aminoácidos
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Proteínas
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Carbohidratos
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Salud y Bienestar
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Vitaminas
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Minerales
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    TOP ventas
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Novedades
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    ¿Eres nuevo?
                  </a>
                </li>
              </ul>

              <div className="d-none d-lg-flex align-items-center gap-3"></div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
