const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/regist', userController.getRegistPage);

router.post('/regist', userController.createUser);

router.get('/login', userController.getLoginPage);
router.post('/login', userController.getUser);

module.exports = router;
