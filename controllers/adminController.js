// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const asyncErrorHandler = require("../utils/asyncErrorHandler");
// const CustomError = require("../utils/CustomError");

// const genToken = async (id) => {
//   return await jwt.sign({ id: id }, process.env.JWT_SECRET, {
//     expiresIn: 24 * 60 * 60,
//   });
// };

// const signup = asyncErrorHandler(async (req, res, next) => {
//verify if user is present already
// const existingUser = await User.findOne({ email: req.body.email });
// if (existingUser) {
//   // return res.status(401).json({
//   //   status: "fail",
//   //   message: "user exists already,try logging in",
//   // });
//   const err = new CustomError(401, "user exists already,try logging in");
//   next(err);
// }

//   const newUser = await User.create(req.body);
//   const token = await genToken(newUser._id);
//   res.status(201).json({
//     status: "success",
//     token,
//     data: {
//       newUser,
//     },
//   });
// });

// const login = asyncErrorHandler(async (req, res, next) => {
//   if (!req.body.email || !req.body.password) {
// return res.status(400).json({
//   status: "fail",
//   message: "please enter credentials",
// });
//

const { loginWrapper, signupWrapper } = require("../utils/auth");
const admin = require("../models/admin");

const login = loginWrapper(admin);
const signup = signupWrapper(admin);

module.exports = {
  signup,
  login,
};
