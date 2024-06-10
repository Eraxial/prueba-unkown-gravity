const { Op, Sequelize } = require("sequelize");
const { Conversation, db, User } = require("../models/index");
const Message = require("../models/message");

class ChatController {
  ok = (req, res) => {
    res.send("todo ok");
  };

  getConversations = async (req, res) => {
    const { user_id } = req.params;

    try {
      // Verificar si el usuario existe
      const userExists = await User.findByPk(user_id, {
        attributes: ["user_id", "photo"],
      });

      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }

      // Obtener las conversaciones del usuario
      const conversations = await Conversation.findAll({
        where: {
          [Op.or]: [{ user_id: user_id }, { receptor_user_id: user_id }],
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["photo"],
          },
          {
            model: User,
            as: "receptor",
            attributes: ["photo", "name"],
          },
          {
            model: Message,
            as: "messages",
            include: [
              {
                model: User,
                as: "sender",
                attributes: ["photo"],
              },
              {
                model: User,
                as: "receiver",
                attributes: ["photo", "name"],
              },
            ],
          },
        ],
      });

      // Filtrar las conversaciones para incluir solo las que tienen mensajes relacionados con el usuario
      const filteredConversations = conversations.map(conversation => {
        const filteredMessages = conversation.messages.filter(
          message =>
            message.user_id === parseInt(user_id) ||
            message.receptor_user_id === parseInt(user_id)
        );
        return {
          ...conversation.toJSON(),
          messages: filteredMessages,
        };
      });

      res.json({ user: userExists, conversations: filteredConversations });
    } catch (error) {
      console.error("Error getting conversations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /* try {
      const convers = await Conversation.findAll({
        where: {
          [Op.or]: [
            { user_id: user_id }, // Filtrar por user_id
            { receptor_user_id: user_id }, // Filtrar por receptor_user_id
          ],
        },
        include: [
          {
            model: User,
            as: "user", // Alias para el usuario
            attributes: ["photo"], // Atributos a seleccionar
            where: {
              user_id: Sequelize.col("conversation.user_id"), // Coincidir con el user_id de la conversación
            },
          },
          {
            model: User,
            as: "receptor", // Alias para el receptor
            attributes: ["photo", "name"], // Atributos a seleccionar
            where: {
              user_id: Sequelize.col("conversation.receptor_user_id"), // Coincidir con el receptor_user_id de la conversación
            },
          },
          {
            model: Message,
            where: {
              conversation_id: Sequelize.col("conversation.conversation_id"),
            },
          },
        ],
      });

      res.send(convers);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res
        .status(500)
        .send({ error: "An error occurred while fetching conversations." });
    } */

  // console.log("***************************", datos);

  sendMessage = async (req, res) => {
    const { conversation_id, user_id, receptor_user_id, text, send_date } =
      req.body;

    console.log(req.body);

    try {
      const maxMessageId = await Message.max("message_id", {
        where: {
          conversation_id,
          user_id,
          receptor_user_id,
        },
      });

      const message = await Message.create({
        message_id: maxMessageId + 1,
        conversation_id: conversation_id,
        user_id: user_id,
        receptor_user_id: receptor_user_id,
        text: text,
        send_date: send_date,
      });

      res.status(201).json(message);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  addConversation = async (req, res) => {
    const { conversation_id, user_id, receptor_user_id } = req.body;

    console.log(conversation_id, user_id, receptor_user_id);

    await Conversation.create({
      conversation_id: conversation_id,
      user_id: user_id,
      receptor_user_id: receptor_user_id,
    });
  };
}

module.exports = new ChatController();

/* {
  "user_id": 13,
  "photo": "me.png",
  "conversations": [
      {
          "conversation_id": 1,
          "user_id": 13,
          "receptor_user_id": 4,
          "user": {
              "photo": "me.png"
          },
          "receptor": {
              "photo": "her.jpg",
              "name": "Karina Spencer"
          },
          "messages": [
              {
                  "message_id": 1,
                  "conversation_id": 1,
                  "user_id": 13,
                  "receptor_user_id": 4,
                  "text": "Hola",
                  "send_date": "2024-06-10T16:47:55.000Z"
              }
          ]
      },
      {
          "conversation_id": 1,
          "user_id": 13,
          "receptor_user_id": 14,
          "user": {
              "photo": "me.png"
          },
          "receptor": {
              "photo": "me2.png",
              "name": "Patata"
          },
          "messages": [
              {
                  "message_id": 3,
                  "conversation_id": 1,
                  "user_id": 13,
                  "receptor_user_id": 14,
                  "text": "dasdasd",
                  "send_date": "2024-06-10T17:05:56.000Z"
              },
              {
                  "message_id": 1,
                  "conversation_id": 1,
                  "user_id": 13,
                  "receptor_user_id": 14,
                  "text": "Hello",
                  "send_date": "2024-06-10T16:48:02.000Z"
              },
          ]
      }
  ]
}  */
