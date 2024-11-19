const userModel = require('../models/userModel');
const path = require('path');

// USER
exports.getRegistPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../Public', 'Html', 'user_regist.html')
  );
};
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../Public', 'Html', 'user_login.html'));
};
exports.getModifyNicknamePage = (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../Public', 'Html', 'user_nickname_modify.html')
  );
};
exports.getModifyPasswordPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../Public', 'Html', 'user_password_modify.html')
  );
};

exports.getCurrentUser = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized: No user logged in' });
  }

  res.status(200).json({
    email: req.session.user.email,
    nickname: req.session.user.nickname,
  });
};
exports.createUser = (req, res) => {
  try {
    const { email, password, nickname, profile_image } = req.body;

    const userData = {
      email: email,
      password: password,
      nickname: nickname,
      profile_image: profile_image || '',
    };

    userModel.addUser(userData);
    res
      .status(201)
      .json({ message: 'User created successfully', data: userData });
  } catch (error) {
    console.error('Erorr in create user : ', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
exports.deleteUser = (req, res) => {
  const email = req.session.user.email;
  const success = userModel.deleteUser(email);
  if (success) {
    // 세션 삭제 및 응답

    req.session.destroy((err) => {
      if (err) {
        console.error('세션 삭제 실패:', err);
        return res.status(500).send('Error deleting session');
      }
      console.log('success delete');
      res.clearCookie('connect.sid'); // 세션 쿠키 삭제
      res.status(200).send('User successfully deleted');
    });
  } else {
    res.status(404).send('User not found');
  }
};
exports.patchUser = (req, res) => {
  const { data, field } = req.body;
  const email = req.session.user.email;
  userModel.patchUser(email, field, data);
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const userList = userModel.getUsers();
  const user = userList.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    req.session.user = { email: user.email, nickname: user.nickname };
    console.log(req.session.user);
    res.cookie('loggedIn', true, { httpOnly: true });
    return res.status(200).send('Login successful');
  }
  res.status(401).send('Invalid email or password');
};

exports.checkEmail = (req, res) => {
  const { email } = req.body;

  const isDuplicate = userModel.isEmailDuplicate(email);

  if (isDuplicate) {
    return res.json({ duplicated: true });
  } else {
    return res.json({ duplicated: false });
  }
};
