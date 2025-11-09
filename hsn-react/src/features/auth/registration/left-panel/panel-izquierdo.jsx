export default function PanelIzquierdo() {
  return (
    <div className="p-3 p-md-4 ps-md-5">
      <h2 className="hsn-register-title m-0 mb-3">Hola, ¿creamos tu cuenta?</h2>

      <p className="mb-3 small hsn-register-lead">
        Estás a punto de crear tu cuenta en HSNstore con lo que conseguirás
        acceder a promociones especiales, acumular puntos, y ahorrarte dinero...
      </p>
      <a
        href="#"
        data-toggle="modal"
        data-target="#loginPageContent"
        className="small text-decoration-underline"
      >
        Uy, si yo ya tengo una cuenta creada.
      </a>
      <ul className="list-unstyled hsn-benefits mb-4 d-none d-lg-block mt-2">
        <li className="d-flex align-items-start mb-2">
          <i className="bi bi-check-circle-fill hsn-text-orange me-2 mt-1" />
          <span className="small">
            Accederás a promociones y descuentos antes que nadie.
          </span>
        </li>
        <li className="d-flex align-items-start mb-2">
          <i className="bi bi-check-circle-fill hsn-text-orange me-2 mt-1" />
          <span className="small">
            Acumularás puntos = dinero para futuras compras.
          </span>
        </li>
        <li className="d-flex align-items-start mb-2">
          <i className="bi bi-check-circle-fill hsn-text-orange me-2 mt-1" />
          <span className="small">
            Recibirás cupones, regalos sorpresa sólo para registrados.
          </span>
        </li>
        <li className="d-flex align-items-start mb-2">
          <i className="bi bi-check-circle-fill hsn-text-orange me-2 mt-1" />
          <span className="small">
            Podrás invitar a tus amigos y conseguir 5€ en futuras compras.
          </span>
        </li>
        <li className="d-flex align-items-start mb-2">
          <i className="bi bi-check-circle-fill hsn-text-orange me-2 mt-1" />
          <span className="small">
            Puedes cargar tus pedidos anteriores con un solo click.
          </span>
        </li>
        <li className="d-flex align-items-start">
          <i className="bi bi-check-circle-fill hsn-text-orange me-2 mt-1" />
          <span className="small">Y mucho más...</span>
        </li>
      </ul>

      <div className="mb-2">
        <div className="fw-bold h6 mb-2 hsn-social-title small fst-italic">
          Crea o accede con tus redes sociales
        </div>
      </div>

      <div className="row g-2">
        <div className="col-6 col-md-12">
          <button type="button" className="btn w-100 hsn-btn-social">
            <span className="btn-icon">
              <i className="bi bi-google" />
            </span>
            <span className="btn-label">Continuar con Google</span>
          </button>
        </div>
        <div className="col-6 col-md-12">
          <button type="button" className="btn w-100 hsn-btn-social">
            <span className="btn-icon">
              <i className="bi bi-facebook" />
            </span>
            <span className="btn-label">Continuar con Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}
