const express = require("express");
const cors = require("cors")
const dbConnect = require("./src/config/db");
const urlRouter = require("./src/routes/urlRouter");
const userRouter = require("./src/routes/userRouter");
const passport = require("./src/auth/Auth");
const session = require("express-session")
const MongoStore = require("connect-mongo");




require("dotenv").config()

const app = express();





app.use(cors({
  origin: process.env.origin, // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.origin);
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());


dbConnect();



app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: 'none',
   },
  store: MongoStore.create({ mongoUrl: process.env.URL })
}))




app.use(passport.initialize())
app.use(passport.session())

app.use("/user", userRouter)
app.use("/url", urlRouter)



module.exports = app;