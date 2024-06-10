const DataTypes = require("sequelize");
const db = require("../config/db");

const User = db.define(
  "user",
  {
    user_id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING,
    },

    photo: {
      type: DataTypes.STRING,
    },

    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

module.exports = User;
