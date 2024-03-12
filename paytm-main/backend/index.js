const express = require("express");
const mainRouter = require("./routes/index");
const app = express.Routrer();

app.use("api/v1", mainRouter);
