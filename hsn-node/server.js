require("dotenv").config();

const configPipeline = require("./config-express/pipeline.js");
const express = require("express");
const app = express();

// variable donde se almacena la funcion que se exporta
configPipeline(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
