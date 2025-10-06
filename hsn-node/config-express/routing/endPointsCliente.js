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
  let resInsert = null;
  //! COMPROBAR ANTES QUE NO EXISTA EL EMAIL EN LA BD
  const duplicadoEmail = await coleccion.findOne({ email: payload.email });
  if (duplicadoEmail) {
    console.log("*** EMAIL DUPLICADO *****");
    return resp
      .status(200)
      .send("EL EMAIL YA ESTA REGISTRADO EN LA BASE DE DATOS!!");
  } else {
    resInsert = await coleccion.insertOne({
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
  const codBASE64_APIKEYS = Buffer.from(
    `${process.env.MAILJET_PUBLIC_APIKEY}:${process.env.MAILJET_SECRET_API}`
  ).toString("base64");
  const enlace_activacion_cuenta = `http://localhost:3000/api/auth/registro/activarCuenta?email=${
    payload.email
  }&idCliente=${resInsert.insertedId}&token=${jwt.sign(
    {
      email: payload.email,
      idCliente: resInsert.insertedId.toString(),
    },
    process.env.FIRMA_JWT_SERVER,
    { expiresIn: "10min" }
  )}`;

  const bodyMail = JSON.stringify({
    Messages: [
      {
        From: {
          Email: "daw590779@gmail.com",
          Name: "Your Mailjet Pilot",
        },
        To: [
          {
            Email: "pixet82308@bllibl.com",
            Name: "testing 1",
          },
        ],
        Subject: "Activa tu cuenta en HSN",
        HTMLPart: `<div style="text-align:center;"><img src="https://www.hsnstore.com/skin/frontend/default/hsnreborn/images/logoHSNReduced.svg" alt="logo tienda HSN"/></div><div><h3>¡Te has registrado en HSN!</h3><br /><p>Gracias por registrarte, por favor confirma tu dirección de correo electrónico para activar tu cuenta con el siguiente enlace:
              <a href="${enlace_activacion_cuenta}">Activar cuenta</a></p></div>`,
      },
    ],
  });
  const envioEmail = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      Authorization: `Basic ${codBASE64_APIKEYS}`,
      "Content-Type": "application/json",
    },
    body: bodyMail,
  });

  const bodyRespuestaMAILJET = await envioEmail.json().catch(() => ({}));
  if (
    !envioEmail.ok ||
    bodyRespuestaMAILJET?.Messages?.[0]?.Status !== "success"
  ) {
    console.error(
      "Mailjet error:",
      envioEmail.status,
      envioEmail.statusText,
      bodyRespuestaMAILJET
    );
    return resp
      .status(502)
      .json({ error: "email_not_sent", details: bodyRespuestaMAILJET });
  }

  return resp.status(201).json({ ok: true, idCliente: resInsert.insertedId });
});

objetoRoutingCliente.get("/activarCuenta", async (req, res) => {
  null;
});

module.exports = objetoRoutingCliente;
