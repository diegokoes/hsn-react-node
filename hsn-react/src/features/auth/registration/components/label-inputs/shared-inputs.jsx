export default function SharedInputs(props) {
  return (
    <>
      {props.datosParticular &&
        Object.entries(props.datosParticular).map(([clave, valor]) => {
          const isPasswordField = clave === "password" || clave === "repassword";
          if (["text", "email", "password"].includes(valor.tipo) || isPasswordField) {
            return (
              <div className="mb-1" key={clave}>
                <label htmlFor={clave} className="form-label small fw-bold">
                  {`${valor.placeholder}`}
                </label>
                {isPasswordField ? (
                  <div className="position-relative mb-1">
                    <input
                      id={clave}
                      name={clave}
                      type={valor.tipo}
                      className="form-control hsn-square-input hsn-password-input pe-5"
                      placeholder={valor.placeholder}
                      onChange={props.handleChange}
                      value={valor.valor}
                    />
                    <span
                      className={`hsn-password-icon text-secondary ${valor.tipo === "text" ? "visible" : ""}`}
                      onClick={() => props?.onTogglePassword && props.onTogglePassword(clave)}
                    >
                      <i className={`bi ${valor.tipo === "text" ? "bi-eye" : "bi-eye-slash"}`} />
                    </span>
                  </div>
                ) : (
                  <input
                    id={clave}
                    name={clave}
                    type={valor.tipo}
                    className="form-control hsn-square-input"
                    placeholder={valor.placeholder}
                    onChange={props.handleChange}
                    value={valor.valor}
                  />
                )}
                {valor.valido === false && <div className="form-text text-danger small">{valor.mensajeValidacion}</div>}
              </div>
            );
          }

          if (valor.tipo === "select") {
            return (
              <div className="mb-3" key={clave}>
                <label htmlFor={clave} className="form-label small fw-bold">
                  {valor.placeholder}
                  <em>*</em>
                </label>
                <select
                  id={clave}
                  name={clave}
                  className="form-select hsn-square-input hsn-select-grey"
                  onChange={props.handleChange}
                  value={valor.valor}
                >
                  {valor.opciones.map((el, pos) => (
                    <option value={el} key={pos}>
                      {el}
                    </option>
                  ))}
                </select>
                {valor.valido === false && <div className="form-text text-danger small">{valor.mensajeValidacion}</div>}
              </div>
            );
          }

          if (valor.tipo === "checkbox") {
            return (
              <div className=" mb-1" key={clave}>
                <label className="form-label small fw-bold">{valor.labelBold} con el state</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={clave}
                    name={clave}
                    onChange={props.handleChange}
                    checked={!!valor.valor}
                  />
                  <label className="form-check-label" htmlFor={clave}>
                    <span className="label-note small">{valor.labelSmall}</span>
                  </label>
                </div>
                {valor.valido === false && <div className="form-text text-danger small">{valor.mensajeValidacion}</div>}
              </div>
            );
          }
        })}
      <div className="row g-3 align-items-center">
        <div className="col-12 col-sm-6 order-sm-2">
          <div className="d-grid">
            <button type="submit" className="btn hsn-btn-create fs-6" disabled={!props.formValido}>
              REGISTRARME YA
            </button>
          </div>
        </div>
        <div className="col-12 col-sm-6 order-sm-1"></div>
      </div>
    </>
  );
}
