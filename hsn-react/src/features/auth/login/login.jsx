import "./login.css";

export default function Login() {
  return (
    <section className="container my-4 my-md-5 d-flex justify-content-center">
      <div className="mx-auto hsn-login-panel">
        <div className="row g-0">
          <div className="col-12">
            <div className="p-3 p-md-4 ">
              <h2 className="hsn-login-title m-0">Acceso a mi cuenta HSN</h2>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-3 p-md-4 ps-md-5">
              <p className="mb-4 small fw-light">
                Si ya eres usuario registrado, introduce tu email y la
                contraseña que utilizaste en el registro
              </p>

              <form onSubmit={(e) => e.preventDefault()} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold small">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control hsn-square-input"
                    placeholder="nombre@ejemplo.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label fw-bold small"
                  >
                    Introduce tu contraseña
                  </label>
                  <div className="input-group hsn-input-group-square">
                    <input
                      id="password"
                      type="password"
                      className="form-control hsn-square-input"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                    />
                    <span className="px-2 d-flex align-items-center text-secondary">
                      <i className="bi bi-eye" />
                    </span>
                  </div>
                </div>

                <div className="d-grid gap-2 mb-2">
                  <button
                    type="submit"
                    className="btn hsn-btn-orange-outline fst-italic"
                    onSubmit={(ev) => {
                      ev.preventDefault();
                      console.log(FormData);
                    }}
                  >
                    Iniciar Sesión
                  </button>
                </div>

                <div className="d-flex justify-content-between small">
                  <a
                    href="#"
                    className="text-decoration-underline hsn-text-sm fw-bold small"
                  >
                    ¿Olvidó su contraseña?
                  </a>
                  <span className="text-success small fw-semibold">
                    <i className="bi bi-lock-fill text-success me-1 " />
                    Conexión segura
                  </span>
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-md-6  border-md-start border-md-top-0">
            <div className={`p-3 p-md-4 pe-md-5 hsn-right-col`}>
              <div className="mb-3">
                <div className="h5 mb-2 fw-bolder small fst-italic">
                  ¿TODAVÍA NO TIENES CUENTA?
                </div>
                <p className="mb-3 small ">
                  Acumula puntos, obtén descuentos exclusivos, recibe regalos
                  sorpresa... todas estas ventajas y muchas más con la cuenta
                  HSN
                </p>
              </div>

              <div className="d-grid gap-2 mb-4">
                <button type="button" className="btn hsn-btn-create fs-5">
                  Crear una cuenta
                </button>
              </div>

              <div className="mb-2">
                <div className="fw-bold h6 mb-2 hsn-social-title small fst-italic">
                  CREA O ACCEDE CON TUS REDES SOCIALES
                </div>
              </div>

              <div className="row g-2">
                <div className="col-6 col-md-12">
                  <button type="button" className="btn w-100 hsn-btn-social">
                    <i className="bi bi-google me-2 " />
                    Continuar con Google
                  </button>
                </div>
                <div className="col-6 col-md-12">
                  <button type="button" className="btn w-100 hsn-btn-social">
                    <i className="bi bi-facebook me-2" />
                    Continuar con Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="text-center small text-muted px-3 px-md-4 pb-3 pb-md-4 ">
              Si haces clic en Continuar con Facebook, Google o Amazon y no eres
              usuario de HSN, pasarás a estar registrado y aceptas los
              <span> </span>
              <a href="#" className="text-decoration-underline hsn-text-sm">
                Términos y Condiciones y la Política de Privacidad
              </a>
              <span> </span>
              de HSN.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
