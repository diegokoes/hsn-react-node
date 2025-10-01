import FormCheckbox from "@/components/forms/checkboxes/form-checkbox";

export default function InputsEmpresa(props) {
  return (
    <>
      <div className="mb-1">
        <label
          htmlFor={props.datosEmpresa}
          className="form-label small fw-bold"
        >
          <em>*</em>
        </label>
        <input
          id={props.empresa}
          name={props.empresa}
          type="text"
          maxLength={100}
          className="form-control hsn-square-input"
          placeholder={`Introduce ${props.empresa}`}
        />
      </div>
      <div className="mb-1">
        <label
          htmlFor={props.datosEmpresa}
          className="form-label small fw-bold"
        >
          <em>*</em>
        </label>
        <input
          id={props.empresa}
          name={props.empresa}
          type="text"
          maxLength={100}
          className="form-control hsn-square-input"
          placeholder={props.datosEmpresa.cifNif}
        />
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
      <FormCheckbox />
    </>
  );
}
