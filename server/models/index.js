const { DataTypes } = require("sequelize");
const db = require("../config/db");
const User = require("./user");
const Book = require("./book");
const Conversation = require("./conversation");
const Message = require("./message");

// Definir asociaciones entre los modelos
User.hasMany(Conversation, { as: "conversations", foreignKey: "user_id" });
User.hasMany(Conversation, {
  as: "receivedConversations",
  foreignKey: "receptor_user_id",
});
User.hasMany(Message, { as: "sentMessages", foreignKey: "user_id" });
User.hasMany(Message, {
  as: "receivedMessages",
  foreignKey: "receptor_user_id",
});

Conversation.belongsTo(User, { as: "user", foreignKey: "user_id" });
Conversation.belongsTo(User, {
  as: "receptor",
  foreignKey: "receptor_user_id",
});
Conversation.hasMany(Message, {
  as: "messages",
  foreignKey: "conversation_id",
});

Message.belongsTo(Conversation, {
  as: "conversation",
  foreignKey: "conversation_id",
});
Message.belongsTo(User, { as: "sender", foreignKey: "user_id" });
Message.belongsTo(User, { as: "receiver", foreignKey: "receptor_user_id" });

User.hasMany(Book, { foreignKey: "user_id", as: "books" });
Book.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Sincronizar los modelos con la base de datos
db.sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(error => {
    console.error("Error syncing database:", error);
  });

// Exportar modelos y conexión
module.exports = {
  db,
  User,
  Book,
  Conversation,
  Message,
};
