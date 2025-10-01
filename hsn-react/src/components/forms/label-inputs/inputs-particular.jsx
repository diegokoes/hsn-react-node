import FormCheckbox from "../checkboxes/form-checkbox";

export default function InputsParticular(props) {
  return (
    <>
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
        <label htmlFor="apellidos" className="for6m-label small fw-bold">
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
      <div className="mb-3">
        <label htmlFor="genero" className="form-label small fw-bold">
          Género <em>*</em>
        </label>
        <select
          id="genero"
          name="genero"
          className="form-select hsn-square-input hsn-select-grey"
        >
          <option value="" defaultValue></option>
          <option value="femenino">Femenino</option>
          <option value="masculino">Masculino</option>
          <option value="no-binario">No binario</option>
          <option value="prefiero-no-decirlo">Prefiero no decirlo</option>
        </select>
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
        <label htmlFor="codigoPlanAmigo" className="form-label small fw-bold">
          Código Plan Amigo
        </label>
        <input
          id="codigoPlanAmigo"
          name="codigoPlanAmigo"
          type="text"
          className="form-control hsn-square-input hsn-referral"
          placeholder="Código Plan Amigo"
        />
      </div>

      <FormCheckbox {...props} />
    </>
  );
}
