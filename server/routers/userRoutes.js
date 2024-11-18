const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized: Please login first');
  }
  next(); // 인증 통과 시 다음 로직으로 진행
}

router.get('/regist', userController.getRegistPage);

router.post('/regist', userController.createUser);

router.get('/login', userController.getLoginPage);
router.post('/login', userController.login);

router.get('/post/list', isAuthenticated, userController.getPostList);

router.get(
  '/user/nickname',
  isAuthenticated,
  userController.getModifyNicknamePage
);
router.patch('/user/nickname');

router.delete('/user', userController.deleteUser);

router.post('/check-email', userController.checkEmail);

module.exports = router;
