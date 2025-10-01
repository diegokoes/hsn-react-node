// exportamos objeto de enrutamiento
const express = require("express");
const objetoRoutingCliente = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
objetoRoutingCliente.post("/Cliente", async (req, resp, next) => {
  try {
    console.log(
      `peticion http POST recibida desde el cliente REACT, con datos en el cuerpo: ${req.body}`
    );

    //1º insercion con mongoose, valida automaticamente, si no, driver nativo mogodb con validacion manual
    console.log(`MONGODB_URL: ${process.env.MONGODB_URL}`);

    await mongoose.connect(process.env.MONGODB_URL);

    // insert con query mongodb pura sin mongoose
    let resInsert = await mongoose.connection.collection("clientes").insertOne({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      cuenta: {
        email: req.body.email,
        password: req.body.password,
        activada: false,
        fechaCreacion: Date.now(),
      },
      pedidos: [],
      listaDeseados: [],
      direccionEnvio: {},
      metodosPagoPreferido: [],
    });
    //2º envio de email con mailjet
    //3º respuesta al cliente

    resp
      .status(200)
      .send({ codigo: 0, mensaje: "datos recibidos correctamente" });
  } catch (error) {
    console.log("error en el registro del cliente ", error);
    resp.status(200).send({
      codigo: 1,
      mensaje: `error en el registro del cliente: ${error}`,
    });
  }
});

module.exports = objetoRoutingCliente;
