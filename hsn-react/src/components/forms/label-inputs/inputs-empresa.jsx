export default function InputsEmpresa() {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="nombreEmpresa" className="form-label small fw-bold">
          Empresa <em>*</em>
        </label>
        <input
          id="nombreEmpresa"
          name="nombreEmpresa"
          type="text"
          maxLength={70}
          className="form-control hsn-square-input"
          placeholder="Empresa"
          />
        <div className="mt-1">
          <small className="companyname-warning-text text-muted">
            Las facturas se emitirán a la razón social especificada en el campo
            'Empresa'.
          </small>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="cifNif" className="form-label small fw-bold">
          CIF / NIF <em>*</em>
        </label>
        <input
          id="cifNif"
          name="cifNif"
          type="text"
          className="form-control hsn-square-input"
          placeholder="CIF / NIF"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="recargoEquivalencia"
          className="form-label small fw-bold"
        >
          Recargo de Equivalencia <em>*</em>
        </label>
        <select
          id="recargoEquivalencia"
          name="recargoEquivalencia"
          className="form-select hsn-square-input"
        >
          <option value="" defaultValue>
            Escoge una Opción
          </option>
          <option value="0">No</option>
          <option value="1">Sí</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="nombre" className="form-label small fw-bold">
          Nombre <em>*</em>
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          maxLength={30}
          className="form-control hsn-square-input mb-2"
          placeholder="Nombre"
        />
        <label htmlFor="apellidos" className="form-label small fw-bold">
          Apellidos <em>*</em>
        </label>
        <input
          id="apellidos"
          name="apellidos"
          type="text"
          maxLength={30}
          className="form-control hsn-square-input"
          placeholder="Apellidos"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label small fw-bold">
          Email <em>*</em>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control hsn-square-input"
          placeholder="Email"
        />
      </div>

      <label htmlFor="password" className="form-label small fw-bold">
        Introduce tu contraseña <em>*</em>
      </label>
      <div className="position-relative">
        <input
          id="password"
          name="password"
          type="password"
          className="form-control hsn-square-input hsn-password-input pe-5"
          placeholder="Introduce tu contraseña"
          autoComplete="new-password"
        />
        <span className="hsn-password-icon text-secondary">
          <i className="bi bi-eye" />
        </span>
      </div>

      <div className="mb-3 position-relative">
        <label htmlFor="repassword" className="form-label small fw-bold">
          Repite tu contraseña <em>*</em>
        </label>
        <div className="position-relative">
          <input
            id="repassword"
            name="repassword"
            type="password"
            className="form-control hsn-square-input hsn-password-input pe-5"
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
          />
          <span className="hsn-password-icon text-secondary">
            <i className="bi bi-eye" />
          </span>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label small fw-bold">
          Enviar promociones especiales para clientes
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="recibirPromociones"
            name="recibirPromociones"
            value="1"
          />
          <label className="form-check-label" htmlFor="recibirPromociones">
            <span className="label-note small">
              Quiero recibir promociones exclusivas y contenidos personalizados
            </span>
          </label>
        </div>
      </div>
      <div className="company-field mb-3">
        <label className="form-label small fw-bold">
          Confirmación razón social
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="confirmarRazonSocial"
            name="confirmarRazonSocial"
            value="1"
          />
          <label
            className="form-check-label companyname-warning-text"
            htmlFor="confirmarRazonSocial"
          >
            Las facturas se emitirán a la razón social especificada en el campo
            'Empresa'.
          </label>
        </div>
      </div>
      <div className="mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="aceptaTerminos"
            name="aceptaTerminos"
            value="1"
          />
          <label className="form-check-label small" htmlFor="aceptaTerminos">
            He leído y acepto la {""}
            <a href="#" className="text-decoration-underline">
              Política de privacidad
            </a>
          </label>
        </div>
      </div>
    </>
  );
}
