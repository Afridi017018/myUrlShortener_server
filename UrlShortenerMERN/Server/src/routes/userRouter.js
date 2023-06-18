const { Router } = require('express');
const router = Router();
const User = require("../models/userModel")


router.post("/reg", async(req,res)=>{
   
  const {name,email,password} = req.body;
 
  
  if(!name || !email || !password)
   return res.status(400).json({message: "Invalid Input!"})

   const found = await User.findOne({email: email})

  if(found)
  return res.status(400).json({message: "This email is already registered !"})

   const newUser = new User({
    name,
    email,
    password
   })

   const saved = await newUser.save();

   res.json(saved);

})




router.post("/login", async(req,res)=>{
   
    const {email,password} = req.body;
   
    
    if(!email || !password)
     return res.status(400).json({message: "Invalid Input!"})
  
     const data = await User.findOne({email: email})
     
       if(!data || data.password !== password)
       return res.status(400).json({message: "Incorrect email or password !"})
   
  
     res.json({message: "Login successful !"});
  
  })


module.exports = router;