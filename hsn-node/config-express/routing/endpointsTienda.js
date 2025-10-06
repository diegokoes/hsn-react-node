// exportamos objeto de enrutamiento
const express = require("express");
const objetoRoutingCliente = express.Router();
const mongoose = require("mongoose");

objetoRoutingTienda.get("/categorias", async (req, resp) => {
  try {
    const tipoCategoria = req.query;
    await mongoose.connect(process.env.MONGODB_URL);
    const coleccion = mongoose.connection.collection("categorias");
    const categorias = await coleccion
      .find({ codigoCategoria: /^\d$/ })
      .toArray();
    resp.status(200).send(categorias);
  } catch (error) {
    console.log("**** ERROR EN GET /categorias", error);
    resp.status(200).send("ERROR EN SERVIDOR");
  }
});

module.exports = objetoRoutingTienda;
