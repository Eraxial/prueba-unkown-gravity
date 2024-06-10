const DataTypes = require("sequelize");
const db = require("../config/db");
const Book = require("./book");

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
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hash(password, bcrypt.genSaltSync(8));
      },
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);

const generateHash = password => {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
};

module.exports = User;
