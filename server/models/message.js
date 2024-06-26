const DataTypes = require("sequelize");
const db = require("../config/db");
const User = require("./user");
const Conversation = require("./conversation");

const Message = db.define(
  "message",
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Conversation,
        key: "conversation_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
    },
    receptor_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    send_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "message",
    timestamps: false,
  }
);

module.exports = Message;
