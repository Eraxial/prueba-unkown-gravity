const DataTypes = require("sequelize");
const db = require("../config/db");
const User = require("./user");

const Conversation = db.define(
  "conversation",
  {
    conversation_id: {
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

    receptor_user_id: {
      type: DataTypes.TINYINT,
      references: {
        model: User,
        key: "user_id",
      },
    },
  },
  {
    tableName: "conversation",
    timestamps: false,
  }
);

module.exports = Conversation;
