const db = require("../config/db");
const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserController {
  getAllUsers = async (req, res) => {
    const usuarios = await User.findAll({
      where: {
        user_id: 1,
      },
    });
    res.send(usuarios);
  };

  createUser = async (req, res) => {
    try {
      const maxId = await User.max("user_id");
      if (maxId === null) {
        res.status(200).send("No records found");
      } else {
        await User.create({
          user_id: maxId + 1,
          email: "c@c",
          name: "Pepe",
        });
      }
    } catch (error) {
      console.error("Error fetching max user_id:", error);
      res.status(500).send("Internal server error");
    }
  };

  registerUser = async (req, res) => {
    try {
      const { email, password, name } = req.body;

      const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(8));
      let maxId = await User.max("user_id");
      if (maxId === null) {
        maxId = 1;
      }

      await User.create({
        user_id: maxId + 1,
        email: email,
        password: hashedPassword,
        name: name,
      });
      res.status(200).json("Registered succesfully");
    } catch (error) {
      res.status(500).json("Something happened");
    }
  };

  login = async (req, res) => {
    
    try {
      const {email, password} = req.body;
    const user = await User.findAll({
      where: {
        email: email
      }
    })

    const verifiedPass = await bcrypt.compare(password, user[0].password);

    //todo
      //generar token 
      //enviarlo al front
      //que el front lo verifique y que cambie el estado de user al usuario del token
    }catch(error) {
      throw new Error(error)
    }
  }
}

module.exports = new UserController();
