const { Router } = require('express');
const router = Router();
const ip = require('ip');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const validator = require('validator');
const User = require("../models/userModel");
// const passport = require("../auth/Auth");
const checkLogin = require('../middlewares/checkLogin');


const saltRounds = 10;


// router.get("/check",checkLogin, (req,res)=>{
// // console.log(req.user)
//   res.send("checked.......!!!!")
// } )

router.post("/reg", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password){
    return res.status(400).json({ message: "Invalid Input!" });
  }

  const found = await User.findOne({ email: email });

  if (found){
    return res.status(400).json({ message: "This email is already registered!" });
  }

  const isValidEmail = await validator.isEmail(email);
  
  if(!isValidEmail){
    return res.status(400).json({ message: "This email is not valid !" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    image:"",
  });

  const saved = await newUser.save();
  
  res.json({ message: "Signup successful!", value: "1"});
});






router.post("/login",async (req,res)=>{
  const {email,password} = req.body;

  const user = await User.find({email: email})

  if(user && user.length > 0)
  {
    const isValidPassword = await bcrypt.compare(password, user[0].password);
      if(isValidPassword)
      {

        const token = jwt.sign({
          email: user[0].email,
          id: user[0]._id,
          image: user[0].image,
          name: user[0].name,
      }, "secret_key", {
          expiresIn: '1h'
      });

        return res.json({ message: "Authentication successful",access_token: token})
      }

      else{
        return res.status(401).json({ message: "Wrong credentials !" });
      }
  }

  else{
    return res.status(401).json({ message: "Wrong credentials !" });
  }

})




router.get('/check-login', checkLogin, async function (req, res) {

  if (req.user) {
 
    const user = await User.find({_id: req.user.id})

    return res.status(200).json({ isLoggedIn: true , image: user[0].image, name: user[0].name , email: user[0].email, id: user[0].id, ip: ip.address()});
  }

    return res.status(401).json({ isLoggedIn: false });
  
});



router.put("/update-profile", checkLogin, async(req,res)=>{

  const {id,image,name} = req.body;

  if(Boolean(image))
  {
    const data = await User.findByIdAndUpdate({_id: id},{image: image, name: name})

    // req.session.user = {...req.session.user, name: name, image: image};
    res.json({message: "Profile Updated"})
  }

  else{
    const data = await User.findOneAndUpdate({_id: id},{name: name})
    // req.session.user = {...req.session.user, name: name};
    res.json({message: "Profile Updated"})
  }

  

})



router.put("/change-password", checkLogin, async(req,res)=>{
  
  const {id, oldPass, newPass} = req.body;
  // console.log(req.body)

  const user = await User.findOne({_id: id})
 
  const comparedPassword = await bcrypt.compare(oldPass, user.password);

  if(comparedPassword)
  {
       const hashedPassword = await bcrypt.hash(newPass, saltRounds);
        const data = await User.findByIdAndUpdate({_id: id},{password: hashedPassword})

    // req.session.user = {...req.session.user, password: hashedPassword};
    res.json({message: "Password Updated"})
  }

  else{
    res.json({message: "Current password did not match"})
  }
 


})


//*****old project */


// const isAuthenticated = (req, res, next) => {
//   // console.log(req.user)

//   if (req.session.user) {
//     // console.log("hmmm ashche to")
//       return next();
//   }
//   return res.status(401).json({ "message": "Unauthorized access!" })
// }


// // router.use((req, res, next) => {
// //   req.user = req.session.user;
// //   next();
// // });

// // router.use(isAuthenticated);

// // app.get("/", isAuthenticated, (req, res) => {

// //   res.json({ "message": "WELCOME!!!" })

// // })




// router.post("/reg", async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password){
//     return res.status(400).json({ message: "Invalid Input!" });
//   }

//   const found = await User.findOne({ email: email });

//   if (found){
//     return res.status(400).json({ message: "This email is already registered!" });
//   }

//   const isValidEmail = await validator.isEmail(email);
  
//   if(!isValidEmail){
//     return res.status(400).json({ message: "This email is not valid !" });
//   }

//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   const newUser = new User({
//     name,
//     email,
//     password: hashedPassword,
//     image:"",
//   });

//   const saved = await newUser.save();
  
//   res.json({ message: "Signup successful!", value: "1"});
// });



// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       return res.status(500).json({ message: "Internal Server Error" });
//     }

//     if (!user) {
//       return res.status(401).json({ message: "Wrong credentials !" });
//     }

//    req.session.user = user; // Store user object in session
//   //  req.session.save();
 

// // console.log(req.session.user)
//     return res.json({ message: "Authentication successful",isLoggedIn: true , email: req.session.user.email});
//   })(req, res, next);
// });


// router.get('/check-login', isAuthenticated, function (req, res) {

//   if (req.session.user) {
//     // console.log(req.session.user)
//     return res.status(200).json({ isLoggedIn: true , image: req.session.user.image, name: req.session.user.name , email: req.session.user.email, id: req.session.user.id, ip: ip.address()});
//   }

//     return res.status(401).json({ isLoggedIn: false });
  
// });


// router.put("/update-profile", isAuthenticated, async(req,res)=>{

//   const {id,image,name} = req.body;

//   if(Boolean(image))
//   {
//     const data = await User.findByIdAndUpdate({_id: id},{image: image, name: name})

//     req.session.user = {...req.session.user, name: name, image: image};
//     res.json({message: "Profile Updated"})
//   }

//   else{
//     const data = await User.findOneAndUpdate({_id: id},{name: name})
//     req.session.user = {...req.session.user, name: name};
//     res.json({message: "Profile Updated"})
//   }

  

// })


// router.put("/change-password", isAuthenticated, async(req,res)=>{
  
//   const {id, oldPass, newPass} = req.body;
//   // console.log(req.body)

//   const user = await User.findOne({_id: id})
 
//   const comparedPassword = await bcrypt.compare(oldPass, user.password);

//   if(comparedPassword)
//   {
//        const hashedPassword = await bcrypt.hash(newPass, saltRounds);
//         const data = await User.findByIdAndUpdate({_id: id},{password: hashedPassword})

//     req.session.user = {...req.session.user, password: hashedPassword};
//     res.json({message: "Password Updated"})
//   }

//   else{
//     res.json({message: "Current password did not match"})
//   }
 


// })


// router.get("/logout",(req,res)=>{
//   req.logout((err) => {
//       if (err) {
//           res.status(400).json({ "message": "Error logging out" });
//       } else {
//         res.json({ "message": "Logged out successfully" });
//       }
//   });
// })

// // console.log(req.session.user)
module.exports = router
