export default function HeaderMainContainer() {
  // const { pedido } = useGlobalState();
  //!TODO meterle logica para pintar el numero de pedidos
  return (
    <div className="header_main_container py-2">
      <div className="container">
        <div className="row align-items-center gx-2">
          <div className="col-auto">
            <div className="logo d-flex align-items-center">
              <a
                href="/"
                className="d-inline-flex align-items-center text-decoration-none"
              >
                <img
                  src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/logoHSNReduced.svg"
                  alt="NUTRICIÓN DEPORTIVA Y DIETÉTICA NATURAL"
                  width="100"
                  height="33"
                />
              </a>
            </div>
          </div>

          <div className="col">
            <div className="search-md w-100">
              <form
                id="search_mini_form"
                action="#"
                method="get"
                className="w-100"
              >
                <div className="input-group input-group-sm">
                  <input
                    id="search"
                    type="text"
                    name="q"
                    className="form-control rounded-0"
                    placeholder="Buscar por: Producto, Objetivo, Ingrediente..."
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    title="Ir"
                    className="btn btn-outline-secondary rounded-0 btn-sm"
                  >
                    <i className="bi bi-search" aria-hidden="true"></i>
                    <span className="visually-hidden">Buscar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-auto d-none d-md-flex align-items-center">
            <div className="trustedshop d-flex align-items-center">
              <img
                src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/logos/trustpilot-icon.png"
                alt="Trustpilot"
                width="44"
                height="44"
                className="me-2"
              />
              <a
                href="https://es.trustpilot.com/review/hsnstore.com?languages=es"
                rel="noopener"
                target="_blank"
                className="text-decoration-none text-reset"
              >
                <span className="me-2 text-dark">
                  <b>Excelente</b> - Trustpilot
                </span>
                <div className="rating text-warning small">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <span className="ms-1 fw-bold text-dark">4.60/5.00</span>
                </div>
              </a>
            </div>
          </div>

          <div className="col-auto">
            <div className="shopping-cart">
              <button
                className="btn position-relative px-3"
                type="button"
                aria-label="Carrito de la compra"
                style={{ backgroundColor: "#ff6000", borderColor: "#ff6000" }}
              >
                <i
                  className="bi bi-cart3 text-white"
                  style={{ fontSize: "1.05rem" }}
                ></i>
                <span
                  className="position-absolute"
                  style={{
                    top: "0.15rem",
                    right: "0.4rem",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    lineHeight: 1,
                  }}
                >
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
