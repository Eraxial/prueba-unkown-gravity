var express = require("express");
const chatController = require("../controllers/chatController");
var router = express.Router();

/* GET home page. */
router.get("/", chatController.ok);

router.get("/:user_id", chatController.getConversations);

module.exports = router;
