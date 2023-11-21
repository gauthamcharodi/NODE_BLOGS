const User = require("../models/User");
const jwt =require("jsonwebtoken")
const auth = async (req, res, next) => {
  try {
    let testToken = req.headers.authorization;
    let token;
    if (testToken && testToken.startsWith("Bearer")) {
      token = testToken.split(" ")[1];
    }
    // console.log(token);
    if(!token){
        return res.status(401).json({
            status: "fail",
            message:'Try logging in to access'
          });
    }
    const decodedToken=await jwt.verify(token,process.env.JWT_SECRET)
    const user=await User.findById(decodedToken.id)
    if(!user){
      return  res.status(401).json({
            status: "fail",
            message:"user no longer exists",
          });
    }
    req.user=user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};
module.exports = auth;
