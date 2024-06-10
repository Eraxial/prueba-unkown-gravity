const db = require("../config/db");
const User = require("./user");
const Book = require("./book");
const Conversation = require("./conversation");
const Message = require("./message");

// Define las asociaciones, aquí se sabe las contraints de las bases de datos
User.hasMany(Book, { foreignKey: "user_id" });
Book.belongsTo(User, { foreignKey: "user_id" });
Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

module.exports = {
  db,
  User,
  Book,
  Conversation,
};
