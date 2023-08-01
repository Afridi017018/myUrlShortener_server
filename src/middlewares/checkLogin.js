const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
    // console.log(req.headers)
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, "secret_key");
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