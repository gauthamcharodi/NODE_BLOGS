const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");
const admin = require("../models/admin");
const author = require("../models/author");

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
  let Models = [User, admin, author];
  let user = Models.map(async (Model) => {
    let user = await Model.findById(decodedToken.id);
    return user;
  });
  user = await Promise.all(user);
  let authorizedUser = user.filter((doc) => doc !== null);
  if (!authorizedUser) {
    const err = new CustomError(401, "user no longer exists");
    next(err);
  }
  req.user = authorizedUser[0];
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
      const err = new CustomError(401, "You are not authorized");
      next(err);
    }
    next();
  };
};
module.exports = { auth, verifyRole };
