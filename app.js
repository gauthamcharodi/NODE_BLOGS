const express = require("express");
const authRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/BlogRoutes");
const app = express();

app.use(express.json());
app.use("/app/v1/users", authRoutes);
app.use("/app/v1/blogs", blogRoutes);

module.exports = app;
