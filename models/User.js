const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name field cant be empty"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email field cant be empty"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Enter valid Email"],
    },
    password: {
      type: String,
      required: [true, "password field cant be empty"],
      minlength: [8, "password should contain above 8 characters"],
    },
    confirmpassword: {
      type: String,
      required: [true, "confirm password field cant be empty"],
      // minlength: [8, "confirm password should contain above 8 characters"],
      // custom validation
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "password doesnt match",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "author"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (pwd, pwdDB) {
  return await bcrypt.compare(pwd, pwdDB);
};

module.exports = model("user", userSchema);
