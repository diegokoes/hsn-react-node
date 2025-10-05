// exportamos objeto de enrutamiento
const express = require("express");
const objetoRoutingCliente = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

objetoRoutingCliente.post("/registro", async (req, resp) => {
  console.log(req.body);

  const { payload, tipo } = req.body;
  const coleccionNombre = tipo === "empresa" ? "empresas" : "particulares";

  await mongoose.connect(process.env.MONGODB_URL);

  const coleccion = mongoose.connection.collection(coleccionNombre);
  //! COMPROBAR ANTES QUE NO EXISTA EL EMAIL EN LA BD
  const duplicadoEmail = await coleccion.findOne({ email: payload.email });
  if (duplicadoEmail) {
    console.log("*** EMAIL DUPLICADO *****");
    return resp.status(
      200,
      "EL EMAIL YA ESTA REGISTRADO EN LA BASE DE DATOS!!"
    );
  } else {
    const resInsert = await coleccion.insertOne({
      ...payload,
      password: bcrypt.hashSync(payload.password, 10),
      cuentaActivada: false,
      imagenAvatar: "",
      fechaCreacionCuenta: Date.now(),
      pedidos: [],
      listaDeseados: [],
      direcciones: [],
      metodosPago: [],
    });
    console.log("*** INSERTADO? : ", resInsert);
  }

  //2º envio de email con mailjet -  invocamos a nuestro servicio REST API
  // cliente react -> servicio nodejs -> servicio mailjet apirest
  // peticion http post con fetch, también se puede usar axios

  //3º respuesta al cliente
});

module.exports = objetoRoutingCliente;
