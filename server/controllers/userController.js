const db = require("../config/db");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../services/sendVerificationMail");
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
      const { user_id } = req.params;
      console.log(user_id);
      const user = await User.findAll({
        where: {
          user_id: user_id,
        },
      });
      res.status(200).json(user[0]);
    } catch (error) {
      res.status(500).json(error);
    }
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
      //Traemos los datos del formulario de registro
      const { email, password, name } = req.body;

      // Hasheamos la contraseá por seguridad
      const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(8));

      // Traemos de la base de datos el id de usuario más alto, si la consulta es null, devolverá 1
      let maxId = await User.max("user_id");
      if (maxId === null) {
        maxId = 1;
      }

      console.log(maxId);

      // Creamos el token con el id del usuario que será 1 mayor que el id maximo que hemos traido
      const token = jwt.sign(
        {
          user_id: maxId + 1,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      // Creamos la url que tiene que pulsar el usuario para ser verificado, y enviamos el mail
      const url = `http://localhost:5173/verify/${token}`;

      sendVerificationEmail(email, url);

      // Creamos el usuario en la base de datos
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

  verifyUser = async (req, res) => {
    // Recogemos el token que nos envía el front
    const { token } = req.body;
    let decoded;

    // Verificamos que el token es correcto y lo decodificamos
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      console.error(error.message);
      res.status(401).json("Enlace expirado, se te enviará otro correo.");
    }

    // Verificamos al usuario en la base de datos.
    try {
      const user_id = decoded.user_id;
      console.log(user_id);

      await User.update(
        { is_verified: true },
        {
          where: {
            user_id: user_id,
          },
        }
      );
      res.status(200).json("Usuario verificado correctamente");
    } catch (err) {
      console.log(err);
      res.status(500).json("No se ha podido verificar el usuario");
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findAll({
        where: {
          email: email,
        },
      });
      if (user.length !== 0) {
        const verifiedPass = await bcrypt.compare(password, user[0].password);
        if (verifiedPass) {
          const token = jwt.sign(
            {
              user_id: user[0].user_id,
            },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );
          console.log(token);
          res.status(200).json({ msg: "Token enviado", token: token });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
}

module.exports = new UserController();
