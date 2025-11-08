// exportamos objeto de enrutamiento
const express = require("express");
const objetoRoutingTienda = express.Router();
const mongoose = require("mongoose");

// GET /Categorias - Recupera categorías según pathCat
// - Si pathCat= "principales" => categorías raíz (pathCategoria es un único dígito)
// - Si pathCat!= "principales" => subcategorías cuyo pathCategoria comienza por `${pathCat}-<numero>`
// Ejemplo de consumo desde React:
// fetch('http://localhost:3000/api/Tienda/Categorias?pathCat=principales')
objetoRoutingTienda.get("/Categorias", async (req, res) => {
  try {
    // 1) Leemos el filtro que llega por querystring
    const pathCat = req.query.pathCat;

    // 2) Construimos el patrón de búsqueda según el valor de pathCat
    //    - principales => solo dígitos (raíz)
    //    - otro valor => empieza por `${pathCat}-` y sigue con uno o más dígitos
    const patronBusqueda = pathCat === "principales" ? /^\d+$/ : new RegExp(`^${pathCat}-[0-9]+`);

    // 3) Conectamos a MongoDB (URI en MONGODB_URL) y obtenemos la colección
    await mongoose.connect(process.env.MONGODB_URL);
    const categoriasCursor = mongoose.connection
      .collection("categorias")
      .find({ pathCategoria: { $regex: patronBusqueda } }); // cursor: puntero a los resultados

    // 4) Convertimos el cursor en array y devolvemos respuesta OK
    const categorias = await categoriasCursor.toArray();
    res.status(200).send({
      codigo: 0,
      mensaje: `categorias recuperadas ok para pathCat: ${pathCat}`,
      categorias,
    });
  } catch (error) {
    // 5) Manejamos errores devolviendo estructura uniforme
    console.log(`error al obtener categorias: ${error}`);
    res.status(200).send({
      codigo: 5,
      mensaje: `error al obtener categorias: ${error}`,
      categorias: [],
    });
  }
});

// GET /Productos - Recupera productos por pathCat
// - Si pathCat es de 2º nivel (contiene 1 guion, ej: "2-3") => productos cuyo pathCategoria COMIENZA por `${pathCat}-`
// - Si es de 3º nivel (dos guiones, ej: " 2-3-4") => productos cuyo pathCategoria COINCIDE exactamente
objetoRoutingTienda.get("/Productos", async (req, res) => {
  try {
    const pathCategoria = req.query.pathCat;
    console.log(`pathCategoria recibida en query: ${pathCategoria}`);

    // 2) Creamos el patrón en base a si es nivel 2 (prefijo) o nivel 3 (match exacto)
    const isNivel2 = (pathCategoria || "").split("-").length === 2; // ej: "2-3"
    const patron = isNivel2
      ? new RegExp(`^${pathCategoria}-`) // empieza por "2-3-"
      : new RegExp(`^${pathCategoria}$`); // coincide exactamente "2-3-4"

    // 3) Conectamos a MongoDB y consultamos productos
    await mongoose.connect(process.env.MONGODB_URL);
    const productos = await mongoose.connection
      .collection("productos")
      .find({ pathCategoria: { $regex: patron } })
      .toArray();

    // 4) Respuesta OK con array de productos
    console.log(`productosArray recuperados: ${JSON.stringify(productos)}`);
    res.status(200).send({ codigo: 0, mensaje: "productos recuperados ok...", productos });
  } catch (error) {
    // 5) Manejo de errores
    console.log("error recuperar productos  ", error);
    res.status(200).send({
      codigo: 1,
      mensaje: "error recuperando productos ..." + error,
      productos: [],
    });
  }
});

module.exports = objetoRoutingTienda;
