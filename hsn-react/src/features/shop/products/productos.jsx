import { useLoaderData, useParams } from "react-router-dom";

export default function Productos() {
  const products = useLoaderData();
  const nameCategory = useParams().nameCat;
  //#region ---- STATE ----

  //#endregion

  //#region ---- EFFECTS ----

  //#endregion

  //#region ---- HANDLERS ----

  //#endregion

  //#region ---- UTILS ----

  //#endregion
  return (
    <div className="container mt-4">
      <h1>Productos</h1>
      <p>Aquí encontrarás todos nuestros productos.</p>
    </div>
  );
}
