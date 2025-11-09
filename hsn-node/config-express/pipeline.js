// modulo para configurar el pipeline de middleware express
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const shopEndpoints = require("./routing/shopEndpoints.js");
const clientEndpoints = require("./routing/clientEndpoints.js");

module.exports = (serverExpress) => {
  // cada modulo middleware es una funcion con 3 parametros
  // request (objeto peticion http) si es el 1º de la cadena.
  // response respuesta http del modulo
  // next pasa al siguiente modulo
  // funciones middleware para todas las rutas, generalmente de paquetes de terceros (modulos npm)

  // cors
  serverExpress.use(cors());
  //* SE ALMACENA EN req.body
  serverExpress.use(cookieParser());

  // middleware express.json() para gestionar peticiones http con formato json,
  //* SE ALMACENA EN req.body
  serverExpress.use(express.json());
  // para gestioanr peticiones http get con variables en url
  //* SE ALMACENA EN req.query
  serverExpress.use(express.urlencoded({ extended: false }));

  // .use() configura/añade un middlware a la pipeline - personalizadas

  //* POR NORMA GENERAL LOS ULTIMOS LOS DE RUTAS PERSONALIZADAS
  serverExpress.use("/api/auth", clientEndpoints);
  // Rutas de la tienda (categorías, productos, etc.)
  serverExpress.use("/api/shop", shopEndpoints);
};
