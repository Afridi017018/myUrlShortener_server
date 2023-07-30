const express = require("express");
const cors = require("cors")
const dbConnect = require("./src/config/db");
const urlRouter = require("./src/routes/urlRouter");
const userRouter = require("./src/routes/userRouter");
const passport = require("./src/auth/Auth");
const session = require("express-session")



require("dotenv").config()

const app = express();


app.use(cors({
  origin: process.env.origin, // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));



app.use(express.json());


dbConnect();


app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/user", userRouter)
app.use("/url", urlRouter)



module.exports = app;