const { Op } = require("sequelize");
const db = require("../config/db");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

class ChatController {
  ok = (req, res) => {
    res.send("todo ok");
  };

  getConversations = async (req, res) => {
    const { user_id } = req.params;

    const convers = await Message.findAll({
      where: {
        [Op.or]: [{ user_id: user_id }, { receptor_user_id: user_id }],
      },
      order: [
        ["conversation_id", "ASC"],
        ["send_date", "ASC"],
      ],
    });

    const groupedMessages = [];

    // Iteramos sobre los resultados para agrupar los mensajes por conversation_id
    convers.forEach(message => {
      const index = groupedMessages.findIndex(
        item => item.conversation_id === message.conversation_id
      );
      if (index === -1) {
        groupedMessages.push({
          conversation_id: message.conversation_id,
          messages: [message],
        });
      } else {
        groupedMessages[index].messages.push(message);
      }
    });
    res.send(groupedMessages);
  };
}

module.exports = new ChatController();
