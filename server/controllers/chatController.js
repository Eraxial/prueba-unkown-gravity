const { Op, Sequelize } = require("sequelize");
const db = require("../config/db");
const { Conversation } = require("../models/index");
const Message = require("../models/message");

class ChatController {
  ok = (req, res) => {
    res.send("todo ok");
  };

  getConversations = async (req, res) => {
    const { user_id } = req.params;

    try {
      const convers = await Conversation.findAll({
        where: {
          user_id: user_id,
        },
        include: [
          {
            model: Message,
            where: {
              conversation_id: Sequelize.col("conversation.conversation_id"), // Filtrar por el mismo conversation_id
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
    }
  };

  sendMessage = async (req, res) => {
    await Message.create(req.body);
    res.send("ok");
  };
}

module.exports = new ChatController();
