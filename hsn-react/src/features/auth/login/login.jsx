import useGlobalState from "@/stores/GlobalState";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const { setAccessToken, setClientData } = useGlobalState.getState();
const RECAPTCHA_SITE_KEY = "6Ld3rwMsAAAAALgzQ5jE3U7a1HpzEwth8stCo1v_";
const RECAPTCHA_ACTION = "login_submit";

export default function Login() {
  const navigate = useNavigate();
  //#region ---- STATE ----
  const msgObligatorio = "▲ Este campo es obligatorio";
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    email: {
      valor: "",
      valido: null,
      validaciones: {
        obligatorio: [true, msgObligatorio],
        patron: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "▲ Este campo debe ser un email válido"],
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

  //#endregion

  //#region ---- EFFECTS ----
  useEffect(() => {
    console.log("formValido:", loginData.formValido);
  }, [loginData.formValido]);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      return;
    }

    const scriptId = "recaptcha-v3-script";
    let cancelled = false;

    const initRecaptcha = () => {
      window.grecaptcha?.ready(() => {
        if (!cancelled) {
          setRecaptchaReady(true);
          setRecaptchaError(null);
        }
      });
    };

    let script = document.getElementById(scriptId);

    if (script) {
      initRecaptcha();
    } else {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initRecaptcha;
      script.onerror = () => {
        if (!cancelled) {
          setRecaptchaError("No se pudo cargar reCAPTCHA. Inténtalo más tarde.");
        }
      };
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (script) {
        script.onload = null;
        script.onerror = null;
      }
    };
  }, [RECAPTCHA_SITE_KEY]);

  //#endregion

  //#region ---- HANDLERS ----
  async function handleSubmit(e) {
    e.preventDefault();

    const { formValido, email, password } = loginData;

    setLoginData((prev) => ({
      ...prev,
      submitClick: true,
    }));

    if (!formValido) {
      console.log("Formulario no válido, no se envían datos.");
      return;
    }

    if (!RECAPTCHA_SITE_KEY) {
      setRecaptchaError("Falta la clave de reCAPTCHA. Contacta con el administrador.");
      return;
    }

    if (!window.grecaptcha) {
      setRecaptchaError("reCAPTCHA no está listo. Inténtalo de nuevo en unos segundos.");
      return;
    }

    setRecaptchaError(null);
    setErrorMessage(null);

    let recaptchaToken;

    try {
      recaptchaToken = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION });
            resolve(token);
          } catch (readyError) {
            reject(readyError);
          }
        });
      });
    } catch (readyError) {
      console.error("Error preparando reCAPTCHA:", readyError);
      setRecaptchaError("No se pudo verificar reCAPTCHA. Inténtalo de nuevo.");
      return;
    }

    if (!recaptchaToken) {
      setRecaptchaError("No se pudo verificar reCAPTCHA. Inténtalo de nuevo.");
      return;
    }

    try {
      const url = "http://localhost:3000/api/auth/login";

      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.valor,
          password: password.valor,
          recaptchaToken,
          recaptchaAction: RECAPTCHA_ACTION,
        }),
      });

      const data = await respuesta.json();
      console.log("Respuesta del servidor:", JSON.stringify(data));

      if (data.ok) {
        setAccessToken(data.sessionToken);
        setClientData(data.userData);
        navigate("/");
      } else {
        setErrorMessage(data.message ?? "No se pudo iniciar sesión.");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setErrorMessage("Se produjo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
  }

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

    console.log("input:", id, "\nvalor:", valor, "\nmensajeValidacion:", mensajeValidacion, "\nvalido:", valido);
  }
  //#endregion

  return (
    <>
      {loginData.submitClick && !loginData.formValido && (
        <ul className="messages mb-2 mt-3">
          <li className="error-msg">
            <ul>
              <li>
                <span>Por favor introduce un usuario y contraseña.</span>
              </li>
            </ul>
          </li>
        </ul>
      )}
      {recaptchaError && (
        <ul className="messages mb-2 mt-3">
          <li className="error-msg">
            <ul>
              <li>
                <span>{recaptchaError}</span>
              </li>
            </ul>
          </li>
        </ul>
      )}
      {errorMessage && (
        <ul className="messages mb-2 mt-3">
          <li className="error-msg">
            <ul>
              <li>
                <span>{errorMessage}</span>
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
                  Si ya eres usuario registrado, introduce tu email y la contraseña que utilizaste en el registro
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
                      <div className="form-text text-danger small">{loginData.email.mensajeValidacion}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold small">
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
                        <i className={`bi bi-eye ${passwordVisible ? "visible" : ""}`} />
                      </span>
                    </div>
                    {loginData.password.valido === false && (
                      <div className="form-text text-danger small">{loginData.password.mensajeValidacion}</div>
                    )}
                  </div>

                  <div className="d-grid gap-2 mb-2">
                    <button type="submit" className="btn hsn-btn-orange-outline fst-italic">
                      Iniciar Sesión
                    </button>
                  </div>

                  <div className="d-flex justify-content-between small">
                    <a href="#" className="text-decoration-underline hsn-text-sm fw-bold small">
                      ¿Olvidó su contraseña?
                    </a>
                    <span className="text-success small fw-semibold">
                      <i className="bi bi-lock-fill text-success me-1 " />
                      Conexión segura
                    </span>
                  </div>
                  <p className="small text-muted mt-3">
                    Este sitio está protegido por reCAPTCHA y se aplican la{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                      Política de Privacidad
                    </a>{" "}
                    y los{" "}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                      Términos de Servicio
                    </a>{" "}
                    de Google.
                  </p>
                </form>
              </div>
            </div>

            <div className="col-12 col-md-6  border-md-start border-md-top-0">
              <div className={`p-3 p-md-4 pe-md-5 hsn-right-col`}>
                <div className="mb-3">
                  <div className="h5 mb-2 fw-bolder small fst-italic">¿TODAVÍA NO TIENES CUENTA?</div>
                  <p className="mb-3 small ">
                    Acumula puntos, obtén descuentos exclusivos, recibe regalos sorpresa... todas estas ventajas y
                    muchas más con la cuenta HSN
                  </p>
                </div>

                <div className="d-grid gap-2 mb-4">
                  <Link to="/auth/registro">
                    <button type="button" className="btn hsn-btn-create fs-5">
                      Crear una cuenta
                    </button>
                  </Link>
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
                Si haces clic en Continuar con Facebook, Google o Amazon y no eres usuario de HSN, pasarás a estar
                registrado y aceptas los
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
