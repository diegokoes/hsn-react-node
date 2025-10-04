import InputsParticular from "@/features/auth/registro/components/label-inputs/inputs-compartidos";
import { useState } from "react";
import LeftPanel from "./panel-izquierdo/panel-izquierdo";
import "./registro.css";

const msgObligatorio = "Este es un campo obligatorio";
export default function Registro() {
  const [formData, setFormData] = useState({
    tipoFormulario: "Particular",
    particular: {
      nombre: {
        valor: "",
        valido: null,
        tipo: "text",
        validaciones: {
          obligatorio: [true, `▲${msgObligatorio}`],
          minLength: [3, "▲ El nombre debe tener al menos 3 caracteres."],
          maxLength: [30, "▲ El nombre no puede tener más de 30 caracteres."],
          patron: [
            /^[a-zA-ZÀ-ÿ\s]{3,30}$/,
            "El nombre solo puede contener letras y espacios.",
          ],
        },
        mensajeValidacion: "",
        placeholder: "Nombre",
      },
      apellidos: {
        valor: "",
        valido: null,
        tipo: "text",
        validaciones: {
          obligatorio: [true, `▲${msgObligatorio}`],
          minLength: [3, "▲ Los apellidos deben tener al menos 3 caracteres."],
          maxLength: [
            30,
            "▲ Los apellidos no pueden tener más de 30 caracteres.",
          ],
          patron: [
            /^[a-zA-ZÀ-ÿ\s]{3,30}$/,
            "▲ Los apellidos solo pueden contener letras y espacios.",
          ],
        },
        mensajeValidacion: "",
        placeholder: "Apellidos",
      },
      email: {
        valor: "",
        valido: null,
        tipo: "email",
        validaciones: {
          obligatorio: [true, `▲${msgObligatorio}`],
          patron: [
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "▲ Introduce un email válido.",
          ],
        },
        mensajeValidacion: "",
        placeholder: "Email",
      },
      genero: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲ ${msgObligatorio}`],
        },
        tipo: "select",
        opciones: [
          "",
          "Femenino",
          "Masculino",
          "No binario",
          "Prefiero no decirlo",
        ],
        placeholder: "Género",
      },
      password: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲${msgObligatorio}`],
          minLength: [8, "▲ La contraseña debe tener al menos 8 caracteres."],
          maxLength: [
            20,
            "▲ La contraseña no puede tener más de 20 caracteres.",
          ],
          patron: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,80}$/,
            "▲ La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
          ],
        },
        tipo: "password",
        placeholder: "Introduce tu contraseña",
      },
      repassword: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲${msgObligatorio}`],
          coincide: "▲ Las contraseñas no coinciden.",
        },
        tipo: "password",
        placeholder: "Repite tu contraseña",
      },
      codigoPlanAmigo: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [false],
          patron: [
            /^[0-9]{5}$/,
            "▲ El código de plan amigo debe tener 5 dígitos.",
          ],
        },
        placeholder: "Código Plan Amigo",
        tipo: "text",
      },

      recibirPromociones: {
        valor: false,
        tipo: "checkbox",
        labelBold: "Enviar promociones especiales para clientes",
        labelSmall:
          "Quiero recibir promociones exclusivas y contenidos personalizados",
      },
      aceptaTerminos: {
        valor: false,
        valido: null,
        validaciones: {
          obligatorio: [true, `▲${msgObligatorio}`],
        },
        tipo: "checkbox",
        labelSmall: "He leído y acepto la Política de privacidad",
      },
      valido: false,
    },
    empresa: {
      empresa: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, "▲ Este es un campo obligartorio"],
          minLength: [
            3,
            "El nombre de la empresa debe tener al menos 3 caracteres.",
          ],
          maxLength: [
            60,
            "El nombre de la empresa no puede tener más de 60 caracteres.",
          ],
          patron: [
            /^[a-zA-ZÀ-ÿ\s0-9.,&-]{3,60}$/,
            "El nombre de la empresa contiene caracteres no válidos.",
          ],
        },
        placeholder: "Empresa",
        extraInfo:
          "Las facturas se emitirán a la razón social especificada en el campo'Empresa'.",
        tipo: "text",
      },
      cifNif: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲ ${msgObligatorio}`],
          patron: [
            /^(?:\d{8}[A-Z]|[XYZ](?:\d{7}[A-Z]|\d{8})|[A-HJ-NP-SUVW]\d{7}[0-9A-J])$/i,
            "▲ CIF/NIF incorrecto, ejemplo 00000000X, X00000000 o A00000000.",
          ],
        },
        placeholder: "CIF / NIF",
        tipo: "text",
      },
      recargoEquivalencia: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲ ${msgObligatorio}`],
        },
        tipo: "select",
        opciones: ["Escoge una opcion", "No", "Sí"],
        placeholder: "Recargo de equivalencia",
      },
      nombre: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲ ${msgObligatorio}`],
          minLength: [3, "▲ El nombre debe tener al menos 3 caracteres."],
          maxLength: [30, "▲ El nombre no puede tener más de 30 caracteres."],
          patron: [
            /^[a-zA-ZÀ-ÿ\s]{3,30}$/,
            "▲ El nombre solo puede contener letras y espacios.",
          ],
        },
        placeholder: "Nombre",
        tipo: "text",
      },
      apellidos: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲ ${msgObligatorio}`],
          minLength: [3, "▲ Los apellidos deben tener al menos 3 caracteres."],
          maxLength: [
            30,
            "▲ Los apellidos no pueden tener más de 30 caracteres.",
          ],
          patron: [
            /^[a-zA-ZÀ-ÿ\s]{3,30}$/,
            "▲ Los apellidos solo pueden contener letras y espacios.",
          ],
        },
        placeholder: "Apellidos",
        tipo: "text",
      },
      email: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲ ${msgObligatorio}`],
          patron: [
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            "▲ Introduce un email válido.",
          ],
        },
        placeholder: "Email",
        tipo: "email",
      },
      password: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲ ${msgObligatorio}`],
          minLength: [8, "▲ La contraseña debe tener al menos 8 caracteres."],
          maxLength: [
            20,
            "▲ La contraseña no puede tener más de 20 caracteres.",
          ],
          patron: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
          ],
        },
        tipo: "password",
        placeholder: "Introduce tu contraseña",
      },
      repassword: {
        valor: "",
        valido: null,
        validaciones: {
          obligatorio: [true, `▲ ${msgObligatorio}`],
          coincide: [false, "▲ Las contraseñas no coinciden."],
        },
        tipo: "password",
        placeholder: "Repite tu contraseña",
      },
      recibirPromociones: {
        valor: false,
        tipo: "checkbox",
        labelBold: "Enviar promociones especiales para clientes",
        labelSmall:
          "Quiero recibir promociones exclusivas y contenidos personalizados",
      },
      confirmarRazonSocial: {
        valor: false,
        valido: null,
        validaciones: {
          obligatorio: [true, `▲ ${msgObligatorio}`],
        },
        labelBold: " Confirmación razón social ",
        labelSmall:
          "Las facturas se emitirán a la razón social especificada en el campo 'Empresa'.",
        tipo: "checkbox",
      },
      aceptaTerminos: {
        valor: false,
        valido: null,
        validaciones: {
          obligatorio: [true, `▲${msgObligatorio}`],
        },
        tipo: "checkbox",
        labelSmall: "He leído y acepto la Política de privacidad",
      },
      formValido: false,
    },
  });
  function handleChange(ev) {
    const valor = ev.target.value;
    const id = ev.target.id;
    const tipoFormulario =
      formData.tipoFormulario === "Particular" ? "particular" : "empresa";
    const campo = formData[tipoFormulario][id];
    let mensajeValidacion = "";
    let formValido = false;
    let valido = null;
    if (
      campo.tipo === "text" ||
      campo.tipo === "email" ||
      campo.tipo === "password"
    ) {
      if (campo.validaciones.obligatorio[0] === true && valor.trim() === "") {
        mensajeValidacion = campo.validaciones.obligatorio[1];
        valido = false;
      } else if (
        campo.validaciones.minLength &&
        valor.length < campo.validaciones.minLength[0]
      ) {
        mensajeValidacion = campo.validaciones.minLength[1];
        valido = false;
      } else if (
        campo.validaciones.maxLength &&
        valor.length > campo.validaciones.maxLength[0]
      ) {
        mensajeValidacion = campo.validaciones.maxLength[1];
        valido = false;
      } else if (
        campo.validaciones.patron &&
        !campo.validaciones.patron[0].test(valor)
      ) {
        mensajeValidacion = campo.validaciones.patron[1];
        valido = false;
      } else if (
        campo.validaciones.coincide &&
        valor !== formData[tipoFormulario].password.valor
      ) {
        valido = false;
        mensajeValidacion = campo.validaciones.coincide;
      } else {
        valido = true;
      }
    } else if (campo.tipo === "select") {
      if (campo.validaciones.obligatorio[0] === true && valor === "") {
        mensajeValidacion = campo.validaciones.obligatorio[1];
        valido = false;
      } else if (
        campo.validaciones.opciones &&
        !campo.validaciones.opciones.includes(valor)
      ) {
        mensajeValidacion = "▲ Selecciona una opción válida.";
        valido = false;
      }
    }
    setFormData((prev) => ({
      ...prev,
      [tipoFormulario]: {
        ...prev[tipoFormulario],
        [id]: {
          ...prev[tipoFormulario][id],
          valor,
          mensajeValidacion,
          valido,
        },
        formValido,
      },
    }));
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

  async function handleSubmit(ev) {
    ev.preventDefault();
  }

  // normaliza el estado del formulario a un payload para la API

  return (
    <section className="container my-4 my-md-5 d-flex justify-content-center">
      <div className="mx-auto hsn-register-panel">
        <div className="row g-0">
          <div className="col-12 col-lg-5">
            <LeftPanel />
          </div>

          <div className="col-12 col-lg-7 border-lg-start border-md-top-0">
            <div className="p-3 p-md-4 pe-md-5">
              <div className="hsn-register-formbox p-3 p-md-4">
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="success_url" value="" />
                  <input type="hidden" name="error_url" value="" />
                  <input type="hidden" name="form_key" value="" />
                  <div className="mb-2 small fw-bold ">
                    Datos de identificación de cuenta
                  </div>
                  <div className="mb-2">
                    <div
                      className="hsn-client-type"
                      role="radiogroup"
                      aria-label="Tipo de cliente"
                    >
                      <input
                        type="radio"
                        name="client_type"
                        id="personal"
                        defaultChecked
                        className="visually-hidden"
                        onClick={() =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            tipoFormulario: "Particular",
                          }))
                        }
                      />
                      <label
                        htmlFor="personal"
                        className="hsn-client-type-option"
                      >
                        Particular
                      </label>
                      <input
                        type="radio"
                        name="client_type"
                        id="company"
                        className="visually-hidden"
                        onClick={() =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            tipoFormulario: "Empresa",
                          }))
                        }
                      />

                      <label
                        htmlFor="company"
                        className="hsn-client-type-option"
                      >
                        Empresa
                      </label>
                    </div>
                    {formData.tipoFormulario === "Particular" && (
                      <p className="hsn-warning mt-1 mb-2 small fw-bold">
                        <em>* </em>Atención: si eres autónomo o empresa y
                        necesitas una factura selecciona la opción EMPRESA.
                      </p>
                    )}
                  </div>

                  <InputsParticular
                    datosParticular={
                      formData.tipoFormulario === "Particular"
                        ? formData.particular
                        : formData.empresa
                    }
                    handleChange={handleChange}
                  />

                  <div className="row g-3 align-items-center">
                    <div className="col-12 col-sm-6 order-sm-2">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn hsn-btn-create fs-6"
                        >
                          REGISTRARME YA
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 order-sm-1"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="text-center small text-muted px-3 px-md-4 pb-3 pb-md-4">
              Al registrarte aceptas los{" "}
              <a href="#" className="text-decoration-underline hsn-text-sm">
                Términos y Condiciones y la Política de Privacidad
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
