const { Router } = require('express');
const router = Router();
const session = require("express-session")
const User = require("../models/userModel");
const passport = require("../auth/Auth");

router.use(session({
  secret: 'keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}
}))

router.use(passport.initialize())
router.use(passport.session())




router.post("/reg", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Invalid Input!" });

  const found = await User.findOne({ email: email });

  if (found)
    return res.status(400).json({ message: "This email is already registered!" });

  const newUser = new User({
    name,
    email,
    password,
  });

  const saved = await newUser.save();
  
  res.json({ message: "Signup successful!"});
});



router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

   req.session.user = user; // Store user object in session
 

// console.log(req.session.user)
    return res.json({ message: "Authentication successful",isLoggedIn: true , email: req.session.user.email});
  })(req, res, next);
});


router.get('/check-login', function (req, res) {

  if (req.session.user) {

    return res.status(200).json({ isLoggedIn: true , email: req.session.user.email, id: req.session.user.id });
  }

    return res.status(401).json({ isLoggedIn: false });
  
});


router.get("/logout",(req,res)=>{
  req.logout((err) => {
      if (err) {
          res.status(400).json({ "message": "Error logging out" });
      } else {
        res.json({ "message": "Logged out successfully" });
      }
  });
})

// console.log(req.session.user)
module.exports = router
