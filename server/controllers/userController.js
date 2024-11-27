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
  const userData = req.body;

  userModel.addUser(userData, (error, results) => {
    if (error) {
      res.status(500).send('사용자 추가 실패');
      return;
    }
    res.status(201).json({ message: '사용자 추가 성공', id: results.email });
  });
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

exports.fetchUsers = (req, res) => {
  userModel.getUsers((err, results) => {
    if (err) {
      res.status(500).send('사용자 데이터를 가져오는데 실패했습니다');
      return;
    }
    res.status(200).json(results);
  });
};

exports.checkEmail = (req, res) => {
  const { email } = req.body;

  userModel.isEmailDuplicate((error, results) => {
    if (error) {
      res.status(500).send('이메일 불러오기 실패');
      return false;
    }
    if (results.some((element) => element.email === email)) {
      return res.json({ duplicated: true });
    } else {
      return res.json({ duplicated: false });
    }
  });
};
