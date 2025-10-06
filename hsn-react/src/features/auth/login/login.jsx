import { useEffect, useState } from "react";
import "./login.css";

// Componente `Login`: controla el formulario de inicio de sesión,
// su estado local, validaciones en cliente y el envío (submit) de datos.
export default function Login() {
  const msgObligatorio = "Este campo es obligatorio";
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    //!TODO Usar el componente inputs-compartidos con login
    //!TODO ^_ añadir informacion a los objetos email y password para conseguirlo
    email: {
      valor: "",
      valido: null,
      validaciones: {
        obligatorio: [true, msgObligatorio],
        patron: [
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "▲ Este campo debe ser un email válido",
        ],
      },
      mensajeValidacion: "",
    },
    password: {
      valor: "",
      valido: null,
      validaciones: {
        obligatorio: [true, msgObligatorio],
        patron: [
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,80}$/,
          "▲ Al menos una mayúscula, una minúscula, un número y un carácter especial, entre 8 y 80 caracteres",
        ],
      },
      mensajeValidacion: "",
    },
    submitClick: false,
    formValido: false,
  });

  // handleSubmit: previene el envío por defecto y marca que se ha intentado
  // enviar el formulario para mostrar errores si hay campos inválidos.
  async function handleSubmit(e) {
    e.preventDefault();
    setLoginData((prev) => ({
      ...prev,
      submitClick: true,
    }));
  }

  // Efecto: observa `formValido` para acciones de depuración o efectos
  // secundarios cuando cambia el estado de validez del formulario.
  useEffect(() => {
    console.log("formValido:", loginData.formValido);
  }, [loginData.formValido]);

  // handleOnChange: valida el campo que cambia, actualiza su valor,
  // mensaje de validación y recalcula `formValido`.
  // Parámetros: evento DOM del input.
  function handleOnChange(e) {
    const { id, value: valor } = e.target;
    const campo = loginData[id];
    const patron = campo.validaciones.patron[0];

    let mensajeValidacion = "";
    let valido = null;

    if (campo.validaciones.obligatorio[0] === true && valor.trim() === "") {
      valido = false;
      mensajeValidacion = campo.validaciones.obligatorio[1];
    } else if (!patron.test(valor)) {
      valido = false;
      mensajeValidacion = campo.validaciones.patron[1];
    } else {
      valido = true;
      mensajeValidacion = "";
    }
    setLoginData((prev) => {
      const otroId = id === "email" ? "password" : "email";
      const campoActualizado = {
        ...prev[id],
        valor,
        mensajeValidacion,
        valido,
      };
      const otroCampoValido = Boolean(prev[otroId].valido);
      const formValido = Boolean(campoActualizado.valido) && otroCampoValido;

      return {
        ...prev,
        formValido,
        [id]: campoActualizado,
      };
    });

    console.log(
      "input:",
      id,
      "\nvalor:",
      valor,
      "\nmensajeValidacion:",
      mensajeValidacion,
      "\nvalido:",
      valido
    );
  }
  return (
    <>
      {loginData.submitClick && !loginData.formValido && (
        <ul className="messages mb-3">
          <li className="error-msg">
            <ul>
              <li>
                <span>Por favor introduce un usuario y contraseña.</span>
              </li>
            </ul>
          </li>
        </ul>
      )}
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

                <form onSubmit={handleSubmit} noValidate>
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
                      onChange={handleOnChange}
                      value={loginData.email.valor}
                    />
                    {loginData.email.valido === false && (
                      <div className="form-text text-danger small">
                        {loginData.email.mensajeValidacion}
                      </div>
                    )}
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
                        type={passwordVisible ? "text" : "password"}
                        className="form-control hsn-square-input"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        onChange={handleOnChange}
                        value={loginData.password.valor}
                      />
                      <span
                        className="px-2 d-flex align-items-center text-secondary hsn-password-toggle"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        <i
                          className={`bi bi-eye ${
                            passwordVisible ? "visible" : ""
                          }`}
                        />
                      </span>
                    </div>
                    {loginData.password.valido === false && (
                      <div className="form-text text-danger small">
                        {loginData.password.mensajeValidacion}
                      </div>
                    )}
                  </div>

                  <div className="d-grid gap-2 mb-2">
                    <button
                      type="submit"
                      className="btn hsn-btn-orange-outline fst-italic"
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
                Si haces clic en Continuar con Facebook, Google o Amazon y no
                eres usuario de HSN, pasarás a estar registrado y aceptas los
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
    </>
  );
}
