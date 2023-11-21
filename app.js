const express = require("express");
const authRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoute");
const app = express();

app.use(express.json());
app.use("/app/v1/users", authRoutes);
app.use("/app/v1/profile", profileRoutes);

module.exports = app;
