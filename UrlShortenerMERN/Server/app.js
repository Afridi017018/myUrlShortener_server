const express = require("express");
const cors = require("cors")
const dbConnect = require("./src/config/db");
const urlRouter = require("./src/routes/urlRouter");
const userRouter = require("./src/routes/userRouter");



require("dotenv").config()

const app = express();


app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));



app.use(express.json());


dbConnect();

app.use("/url",urlRouter)
app.use("/user",userRouter)


module.exports = app;