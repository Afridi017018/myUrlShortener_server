const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt")
const User = require("../models/userModel")


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
     function(email, password, done) {

      User.findOne({ email: email })
        .then(async(user) => {

          if (!user) {
           
            return done(null, false);
          }

          const comparedPassword = await bcrypt.compare(password, user.password);
          // console.log(comparedPassword)
          
          if (!comparedPassword) { 
            
            return done(null, false);
          }
          
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  ));
  

  passport.serializeUser((user,done)=>{
    if(user){  
      
        return done(null,user.id)
    }
    return done(null,false)
  })


  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        
        return done(null, false);
      })
      .catch((error) => {
        return done(error);
      });
  });


  module.exports = passport;