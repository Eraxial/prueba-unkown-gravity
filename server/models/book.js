const DataTypes = require("sequelize");
const db = require("../config/db");

const Book = db.define(
  "book",
  {
    book_id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    written_year: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },

    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "book",
    timestamps: false,
  }
);

module.exports = Book;
