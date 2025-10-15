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
  )}&tipo=${tipo}`;

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

  const bodyRespuestaMAILJET = await envioEmail.json();
  if (
    !envioEmail.ok ||
    bodyRespuestaMAILJET.Messages?.[0].Status !== "success"
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

objetoRoutingCliente.get("/ActivarCuenta", async (req, res) => {
  const { email, idCliente, token, tipo } = req.query;
  console.log(req.query);

  if (!email || !idCliente || !token) {
    return res.status(400).send("Faltan datos obligatorios en la petición");
  }
  const payloadToken = jwt.verify(token, process.env.FIRMA_JWT_SERVER);
  if (payloadToken.email !== email || payloadToken.idCliente !== idCliente) {
    return res.status(400).send("Los datos del token no coinciden");
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URL);

      const coleccion = mongoose.connection.collection(tipo);

      let resUpdate = await coleccion.updateOne(
        { email: email, _id: mongoose.Types.ObjectId(idCliente) },
        { $set: { cuentaActivada: true } }
      );
      res.status(200).redirect("http://localhost:5173/");
    } catch (error) {
      console.log("**** ERROR EN ACTIVAR CUENTA", error);
      res.status(200).redirect("http://localhost:5173//error");
    }
  }
});

objetoRoutingCliente.post("/login", async (req, resp) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(401).send("incorrect login");
    }

    await mongoose.connect(process.env.MONGODB_URL);

    const particularesColl = mongoose.connection.collection("particulares");
    const empresasColl = mongoose.connection.collection("empresas");

    let cliente = await particularesColl.findOne({ email: email });
    let tipo = "particulares";
    if (!cliente) {
      cliente = await empresasColl.findOne({ email: email });
      tipo = "empresas";
    }
    const passwordMatch = await bcrypt.compare(
      password,
      cliente.password || ""
    );

    if (!cliente || !passwordMatch) {
      return resp.status(401).send("incorrect login");
    }

    return resp.status(200).json({ ok: true, idCliente: cliente._id, tipo });
  } catch (err) {
    console.error("Login error:", err);
    return resp.status(401).send("login incorrecto");
  }
});

module.exports = objetoRoutingCliente;
