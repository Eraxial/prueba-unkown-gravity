const { Book, User } = require("../models/index");

class BookController {
  // Método que trae la información de todos los libros en un array de objetos
  getAllBooks = async (req, res) => {
    try {
      const books = await Book.findAll({
        include: {
          model: User,
          as: "user", // Usar el alias correcto aquí
          attributes: ["photo"],
        },
      });
      if (books === null) {
        res.status(200).json("todo ok");
      } else {
        res.status(200).json({ msg: "todo ok", data: books });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

module.exports = new BookController();
