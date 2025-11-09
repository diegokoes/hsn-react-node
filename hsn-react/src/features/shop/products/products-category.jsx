import { useLoaderData, useParams } from "react-router-dom";
import Product from "./product/product";

export default function ProductsCategory() {
  const { pathCategoria } = useParams();

  const productos = useLoaderData();

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex flex-row justify-content-between align-items-center">
          <div style={{ fontSize: "1.5em", color: "#57cad9", fontWeight: "bold" }}>
            {" "}
            {productos.length} Productos encontrados
          </div>
          <div>
            <select className="form-select" aria-label="Default select example">
              <option defaultValue={1}>Ordenar por: Relevancia</option>
              <option value="2">Recomendados HSN</option>
              <option value="3">Mayor descuento</option>
              <option value="4">Mejor valorados</option>
              <option value="5">Más vendidos</option>
              <option value="6">Precio: de más alto a más bajo</option>
              <option value="7">Precio: de más bajo a más alto</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      {productos.length > 0 &&
        productos.map((producto, index) => (
          <div className="row" key={index}>
            <div className="col">
              <Product producto={producto} />
            </div>
          </div>
        ))}
    </div>
  );
}
