const db = require("../config/db");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  getAllUsers = async (req, res) => {
    const usuarios = await User.findAll({
      where: {
        user_id: 1,
      },
    });
    res.send(usuarios);
  };

  getUser = async (req, res) => {
    try {
      const {user_id} = req.params;
      console.log(user_id)
      const user = await User.findAll({
        where: {
          user_id: user_id,
        },
      });
      res.status(200).json(user[0])

    }catch(error){
      res.status(500).json(error)
    }
  }

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
    if (user.length !== 0){
      const verifiedPass = await bcrypt.compare(password, user[0].password);
      if (verifiedPass) {
        const token = jwt.sign({
          user_id: user[0].user_id
        },
          process.env.TOKEN_SECRET,
          {
            expiresIn: '1d'
          }
        )
        console.log(token)
        res.status(200).json({msg: 'Token enviado', token: token})
      }
    }

    
    //todo
      //generar token 
      //enviarlo al front
      //que el front lo verifique y que cambie el estado de user al usuario del token
    }catch(error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new UserController();
