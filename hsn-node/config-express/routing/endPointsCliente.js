const express = require("express");
const objetoRoutingCliente = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendAccountActivationMail } = require("../servicios/nodemailerService");

objetoRoutingCliente.post("/registro", async (req, resp) => {
  console.log(req.body);

  const { payload, tipo } = req.body;
  const collectionName = tipo === "empresa" ? "empresas" : "particulares";

  await mongoose.connect(process.env.MONGODB_URL);

  const coleccion = mongoose.connection.collection(collectionName);
  let resInsert = null;
  let duplicadoEmail = null;
  //! COMPROBAR ANTES QUE NO EXISTA EL EMAIL EN LA BD
  try {
    duplicadoEmail = await coleccion.findOne({ email: payload.email });
  } catch (error) {
    console.log("**** ERROR EN CONSULTA", error);
    return resp.status(500).send("ERROR EN SERVIDOR");
  }
  if (duplicadoEmail) {
    console.log("*** DUPLICATED EMAIL *****");
    return resp.status(200).send("EL EMAIL YA ESTA REGISTRADO EN LA BASE DE DATOS!!");
  } else {
    resInsert = await coleccion.insertOne({
      ...payload,
      password: bcrypt.hashSync(payload.password, 10),
      accountActivated: false,
      imageAvatar: "",
      orders: [],
      wishlist: [],
      directions: [],
      paymentMethods: [],
      accountCreationDate: Date.now(),
    });
    console.log("*** INSERTADO? : ", resInsert);
  }

  const JWT_ACTIVATION = jwt.sign(
    {
      email: payload.email,
      idCliente: resInsert.insertedId.toString(),
    },
    process.env.JWT_SIGNING_KEY,
    { expiresIn: "10min" }
  );

  const url_activate_account = `http://localhost:3000/auth/activar?email=${
    payload.email
  }&idCliente=${resInsert.insertedId.toString()}&token=${JWT_ACTIVATION}&tipo=${collectionName}`;

  sendAccountActivationMail(payload, url_activate_account);
  await mongoose.connection.close();

  return resp.status(201).json({ ok: true, idCliente: resInsert.insertedId });
});

objetoRoutingCliente.get("/activar", async (req, resp, next) => {
  try {
    const { email, idCliente, token, tipo } = req.query;

    if (!email || !idCliente || !token || !tipo)
      throw new Error("Account activation URL doesn't have all the required params");

    const jwt_payload = jwt.verify(token, process.env.JWT_SIGNING_KEY);
    console.log("JWT Payload recieved in /activar endpoint: ", jwt_payload);

    if (email !== jwt_payload.email || idCliente !== jwt_payload.idCliente)
      throw new Error("Data between URL and JWT doesn't match");

    await mongoose.connect(process.env.MONGODB_URL);

    const collection = mongoose.connection.collection(tipo);

    let update = await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(idCliente), email },
      { $set: { accountActivated: true } }
    );

    if (update.modifiedCount === 0) {
      return resp.status(404).send("Account activation failed, account not found");
    }
    return resp.status(200).redirect("http://localhost:5713/activacioncuenta?operation=success");
  } catch (err) {
    console.log(`Error in account activation: ${err}`);
    await mongoose.connection.close();
    return resp.status(500).send("Error activating account");
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
    const passwordMatch = await bcrypt.compare(password, cliente.password || "");

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
