const DataTypes = require("sequelize");
const db = require("../config/db");
const User = require("./user");

const Book = db.define(
  "book",
  {
    book_id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.TINYINT,
      references: {
        model: User,
        key: "user_id",
      },
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
