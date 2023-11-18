const User = require("../models/User");
const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    //verify if user is present already
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(401).json({
        status: "fail",
        message: "user exists already,try logging in",
      });
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const login = async () => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "youre not an existing user, please signup",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        existingUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  signup,
};
