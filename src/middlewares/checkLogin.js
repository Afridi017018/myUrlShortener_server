const jwt = require("jsonwebtoken");

require("dotenv").config()

const checkLogin = (req, res, next) => {
    
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.secret_key);
        const { email, id, image, name } = decoded;
        req.user = {
          email,
          id,
          image,
          name,
        }
        next();
    } catch(err) {
        return res.status(401).json({message :"Authentication failure!", isLoggedIn: false })
    }
};

module.exports = checkLogin;