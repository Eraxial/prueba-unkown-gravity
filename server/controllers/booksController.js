const Book = require('../models/book')

class BookController {

  getAllBooks = async (req, res) => {
    try {
      const books = await Book.findAll()
      if(books === null){
        res.status(200).json('todo ok')
      }else {
        res.status(200).json({msg: 'todo ok', data: books})
      }
    }catch(err) {
      throw new Error(err)
    }
  }

}

module.exports = new BookController()