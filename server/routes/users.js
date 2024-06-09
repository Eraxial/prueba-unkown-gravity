var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

// Ruta de prueba para crear un usuario estándar
router.post("/createUser", userController.createUser);

// Ruta para registrar usuarios
router.post("/register", userController.registerUser);

// Ruta para hacer login
router.post("/login", userController.login);

// Ruta que usa el enlace que se mandar por correo al registrar, para verificar el usuario
router.put("/verify", userController.verifyUser);

// Ruta que se usa para verificar al usuario al ser logeado
router.post("/verifyLogin", userController.verifyLogin);

//Ruta para checar que usuario existe
router.post("/checkUser", userController.checkUser);

// Ruta que trae la información de un usuario en concreto
router.get("/:user_id", userController.getUser);

module.exports = router;
