var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.post("/createUser", userController.createUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.put("/verify", userController.verifyUser);
router.post("/verifyLogin", userController.verifyLogin);
router.get("/:user_id", userController.getUser);

module.exports = router;
