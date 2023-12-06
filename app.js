const express = require("express");
const authRouter = require("./routes/userRoutes");
const authorRouter = require("./routes/authorRoutes");
const adminRouter = require("./routes/adminRoutes");
const blogRoutes = require("./routes/BlogRoutes");
const CustomError = require("./utils/CustomError");
const globalErrorController = require("./controllers/globalErrorController");
const app = express();

app.use(express.json());
app.use("/app/v1/user", authRouter);
app.use("/app/v1/author", authorRouter);
app.use("/app/v1/admin", adminRouter);
app.use("/app/v1/blogs", blogRoutes);

app.all("*", (req, res, next) => {
  // res.status(404).json({status:"fail",
  // message:"page not found"})
  //   let err = new Error("page not found");
  //   err.statusCode = 404;
  //   err.status = "fail";
  //   next(err);
  let err = new CustomError(404, "page not found");
  next(err);
});
// global error handler
app.use(globalErrorController);

module.exports = app;
