const express = require("express");
const cors = require("cors")
const dbConnect = require("./src/config/db");
const urlRouter = require("./src/routes/urlRouter");
const userRouter = require("./src/routes/userRouter");
const passport = require("./src/auth/Auth");
const session = require("express-session")
const MongoStore = require("connect-mongo");
const cookieSession = require("cookie-session");



require("dotenv").config()

const app = express();



const allowedOrigin = "http://localhost:3000";


app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  allowedHeaders: ['Content-Type'], // Allow the "Content-Type" header
}));


// app.use(cors({
//   origin: process.env.origin, // Replace with your frontend URL
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// }));



app.use(express.json());


dbConnect();

// app.use(cookieSession({
//   name: "session",
//   keys: [process.env.session_secret],
//   maxAge: 24 * 60 * 60 * 1000, // Set the cookie to expire after 24 hours (adjust as needed)
//   secure: false // Set to true if using HTTPS in production
// }));

app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    // sameSite: 'none',
   },
  store: MongoStore.create({ mongoUrl: process.env.URL })
}))


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(passport.initialize())
app.use(passport.session())

app.use("/user", userRouter)
app.use("/url", urlRouter)



module.exports = app;