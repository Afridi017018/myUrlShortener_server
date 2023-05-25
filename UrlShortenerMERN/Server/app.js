const express = require("express");
const dbConnect = require("./src/config/db");
const router = require("./src/routes/route");


require("dotenv").config()

const app = express();

app.use(express.json());

dbConnect();

app.use("/url",router)


module.exports = app;