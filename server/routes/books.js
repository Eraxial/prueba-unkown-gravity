const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");

// Ruta para leer todos los libros
router.get("/", booksController.getAllBooks);

module.exports = router;
