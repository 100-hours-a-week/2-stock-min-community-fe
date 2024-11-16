const userModel = require('../models/userModel');
const path = require('path');
// const path = require('path');

// app.use(express.static(path.join(__dirname, '../Public')));
exports.getRegistPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../Public', 'Html', 'user_regist.html')
  );
};
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../Public', 'Html', 'user_login.html'));
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

exports.getUser = (req, res) => {
  const userList = userModel.getUsers();

  userList.map((item) => {
    console.log(item);
    if (item.email === req.body.email && item.password === req.body.password) {
      res.json({ message: 'User login success', data: req.body });
    } else {
      res.sendFile(
        path.join(__dirname, '../../Public', 'Html', 'user_login.html')
      );
    }
  });
};
