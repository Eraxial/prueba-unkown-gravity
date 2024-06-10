var express = require("express");
const chatController = require("../controllers/chatController");
var router = express.Router();

/* GET home page. */
router.get("/", chatController.ok);

router.get("/:user_id", chatController.getConversations);

router.post("/sendMessage", chatController.sendMessage);

router.post("/addConversation", chatController.addConversation);

module.exports = router;
