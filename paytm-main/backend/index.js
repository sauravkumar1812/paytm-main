const express = require("express");
const cors = require("cors");

app.use(cors());
const mainRouter = require("./routes/index");
const app = express.Routrer();

app.use("api/v1", mainRouter);
