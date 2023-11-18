const express = require("express");
const authRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use("/app/v1/users", authRoutes);

module.exports = app;
