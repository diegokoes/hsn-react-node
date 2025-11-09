const express = require("express");
const clientEndpoints = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendAccountActivationMail } = require("../servicios/nodemailerService");

clientEndpoints.post("/register", async (req, resp) => {
  try {
    console.log(req.body);

    const { payload, tipo } = req.body;
    const collectionName = tipo === "empresa" ? "empresas" : "particulares";

    await mongoose.connect(process.env.MONGODB_URL);

    const coleccion = mongoose.connection.collection(collectionName);
    let resInsert = null;
    let duplicadoEmail = null;
    //! COMPROBAR ANTES QUE NO EXISTA EL EMAIL EN LA BD

    duplicadoEmail = await coleccion.findOne({ email: payload.email });

    if (duplicadoEmail) {
      console.log("*** DUPLICATED EMAIL *****");
      return resp.status(200).send("EL EMAIL YA ESTA REGISTRADO EN LA BASE DE DATOS!!");
    } else {
      resInsert = await coleccion.insertOne({
        ...payload,
        password: await bcrypt.hash(payload.password, 10),
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
  } catch (error) {
    console.log("**** ERROR EN REGISTRO", error);
    return resp.status(500).send("ERROR EN SERVIDOR");
  } finally {
    mongoose.connection.close();
  }
});

clientEndpoints.get("/activar", async (req, resp, next) => {
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
    return resp.status(200).redirect("http://localhost:5173/auth/activacion?operation=success");
  } catch (err) {
    console.log(`Error in account activation: ${err}`);
    await mongoose.connection.close();
    return resp.status(500).send("Error activating account");
  } finally {
    mongoose.connection.close();
  }
});

clientEndpoints.post("/login", async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) return resp.status(400).send("Bad Request, email and password needed");
  if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,80}$/.test(password)
  ) {
    return resp.status(200).send("Bad format in email or password");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const empresasCollection = mongoose.connection.collection("empresas");
    const particularesCollection = mongoose.connection.collection("particulares");
    const [userDataEmpresas, userDataParticulares] = await Promise.all([
      empresasCollection.findOne({ email }),
      particularesCollection.findOne({ email }),
    ]);
    const userData = userDataParticulares || userDataEmpresas;
    if (!userData) return resp.status(400).send("Bad Login");

    const passwordsMatch = await bcrypt.compare(password, userData.password);

    if (!passwordsMatch) return resp.status(400).json({ message: "Bad login" });

    if (!userData.accountActivated) return resp.status(400).json({ message: "Your account is not activated" });

    if (email === userData.email && passwordsMatch) {
      const sessionToken = jwt.sign(
        {
          email,
          idCliente: userData._id.toString(),
        },
        process.env.JWT_SIGNING_KEY,
        { expiresIn: "2h" }
      );
      return resp.status(200).json({ ok: true, userData, sessionToken });
    }
  } catch (err) {
    return resp.status(500).send("Error with MongoDB ... ", err);
  } finally {
    mongoose.connection.close();
  }
});

module.exports = clientEndpoints;
