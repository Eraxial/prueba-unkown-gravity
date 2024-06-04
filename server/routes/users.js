var express = require('express');
var router = express.Router();
const userController = require ('../controllers/userController')

/* GET users listing. */
router.get('/', userController.getAllUsers);
router.post('/createUser', userController.createUser)
router.post('/register', userController.registerUser)
router.post('/login', userController.login)

module.exports = router;
