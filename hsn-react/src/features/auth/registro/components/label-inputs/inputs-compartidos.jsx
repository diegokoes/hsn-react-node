export default function InputsCompartidos(props) {
  return (
    <>
      {/* for debugging and see if it passes the object well*/}
      {/* <p>{JSON.stringify(props.datosParticular)}</p> */}

      {props.datosParticular &&
        Object.entries(props.datosParticular).map(([clave, valor]) => {
          if (["text", "email", "password"].includes(valor.tipo)) {
            return (
              <div className="mb-1" key={clave}>
                <label htmlFor={clave} className="form-label small fw-bold">
                  {`${valor.placeholder} con el estate`}
                </label>
                {valor.tipo === "password" ? (
                  <div className="position-relative mb-2">
                    <input
                      id={clave}
                      name={clave}
                      type={valor.tipo}
                      className="form-control hsn-square-input hsn-password-input pe-5"
                      placeholder={valor.placeholder}
                      onChange={props.handleChange}
                      value={valor.valor}
                    />
                    <span className="hsn-password-icon text-secondary">
                      <i className="bi bi-eye" />
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
                {valor.valido === false && (
                  <div className="form-text text-danger small">
                    {valor.mensajeValidacion}
                  </div>
                )}
              </div>
            );
          }

          if (valor.tipo === "select") {
            return (
              <div className="mb-3" key={clave}>
                <label htmlFor={clave} className="form-label small fw-bold">
                  {valor.placeholder} con el state <em>*</em>
                </label>
                <select
                  id={clave}
                  name={clave}
                  className="form-select hsn-square-input hsn-select-grey"
                  onChange={props.handleChange}
                >
                  {valor.opciones.map((el, pos) => (
                    <option value={el} defaultValue key={pos}>
                      {el} con el state
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (valor.tipo === "checkbox") {
            return (
              <div className=" mb-1" key={clave}>
                <label className="form-label small fw-bold">
                  {valor.labelBold} con el state
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={clave}
                    name={clave}
                    value="1"
                    onChange={props.handleChange}
                  />
                  <label className="form-check-label" htmlFor={clave}>
                    <span className="label-note small">{valor.labelSmall}</span>
                  </label>
                </div>
              </div>
            );
          }
        })}
    </>
  );
}
