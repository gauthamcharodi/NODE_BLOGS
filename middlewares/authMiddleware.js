const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

const auth = asyncErrorHandler(async (req, res, next) => {
  let testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }
  // console.log(token);
  if (!token) {
    const err = new CustomError(401, "Try logging in,to access");
    next(err);
  }
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    const err = new CustomError(401, "user no longer exists");
    next(err);
  }
  req.user = user;
  next();
});

// const verifyRole = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       return res.status(400).json({
//         status: "fail",
//         message: "you're not authorized",
//       });
//     }
//     next();
//   };
// };

const verifyRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      // return res.status(400).json({
      //   status: "fail",
      //   message: "you're not authorized",
      // });
      const err = new CustomError(401, "You are not authorized");
      next(err);
    }
    next();
  };
};
module.exports = { auth, verifyRole };
