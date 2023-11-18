const { signup } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/signup", signup);
// router.post("/login",signup)

module.exports = router;
