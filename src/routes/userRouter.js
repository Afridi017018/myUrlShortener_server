const { Router } = require('express');
const router = Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const validator = require('validator');
require("dotenv").config()
const User = require("../models/userModel");
const checkLogin = require('../middlewares/checkLogin');

const saltRounds = 10;




router.post("/reg", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Input!" });
  }

  const found = await User.findOne({ email: email });

  if (found) {
    return res.status(400).json({ message: "This email is already registered!" });
  }

  const isValidEmail = await validator.isEmail(email);

  if (!isValidEmail) {
    return res.status(400).json({ message: "This email is not valid !" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    image: "",
  });

  const saved = await newUser.save();

  res.json({ message: "Signup successful!", value: "1" });
});







router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email: email })

  if (user && user.length > 0) {
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (isValidPassword) {

      const token = jwt.sign({
        email: user[0].email,
        id: user[0]._id,
        image: user[0].image,
        name: user[0].name,
      },
        process.env.secret_key,
      );

      return res.json({ message: "Authentication successful", access_token: token, isLoggedIn: true })
    }

    else {
      return res.status(401).json({ message: "Wrong credentials !", isLoggedIn: false });
    }
  }

  else {
    return res.status(401).json({ message: "Wrong credentials !", isLoggedIn: false });
  }

})




router.get('/check-login', checkLogin, async function (req, res) {

  if (req.user) {

    const user = await User.find({ _id: req.user.id })

    return res.status(200).json({ isLoggedIn: true, image: user[0].image, name: user[0].name, email: user[0].email, id: user[0].id });
  }

  return res.status(401).json({ isLoggedIn: false });

});



router.put("/update-profile", checkLogin, async (req, res) => {

  const { id, image, name } = req.body;

  if (Boolean(image)) {
    const data = await User.findByIdAndUpdate({ _id: id }, { image: image, name: name })

    res.json({ message: "Profile Updated" })
  }

  else {
    const data = await User.findOneAndUpdate({ _id: id }, { name: name })
    res.json({ message: "Profile Updated" })
  }



})



router.put("/change-password", checkLogin, async (req, res) => {

  const { id, oldPass, newPass } = req.body;

  const user = await User.findOne({ _id: id })

  const comparedPassword = await bcrypt.compare(oldPass, user.password);

  if (comparedPassword) {
    const hashedPassword = await bcrypt.hash(newPass, saltRounds);
    const data = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword })

    res.json({ message: "Password Updated" })
  }

  else {
    res.json({ message: "Current password did not match" })
  }



})


module.exports = router;