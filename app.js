const express = require("express");
const cors = require("cors")
const dbConnect = require("./src/config/db");
const urlRouter = require("./src/routes/urlRouter");
const userRouter = require("./src/routes/userRouter");



require("dotenv").config()

const app = express();





app.use(cors());


app.use(express.json());


dbConnect();




app.use("/user", userRouter)
app.use("/url", urlRouter)



module.exports = app;