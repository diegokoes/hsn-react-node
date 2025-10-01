export default function FormCheckbox(props) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label small fw-bold"></label>
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
