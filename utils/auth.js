
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");

const genToken = async (id) => {
  return await jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  });
};

const signupWrapper =(Model)=>{
return asyncErrorHandler(async (req, res, next) => {
  const newUser = await Model.create(req.body);
  const token = await genToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
 });
})
};

const loginWrapper =(Model)=>{
return asyncErrorHandler(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    const err = new CustomError(401, "Please enter Credentials");
    next(err);
  }
  const existingUser = await Model.findOne({ email: req.body.email });
  if (!existingUser ||!(await existingUser.comparePassword(
      req.body.password, existingUser.password)) ) {
      const err=new CustomError(400,`${existingUser.
    role} name and password incorrect`)
    next(err)
  }
  const token = await genToken(existingUser._id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      existingUser,
    },
  });
})};


module.exports = {
  signupWrapper,
  loginWrapper,
};
