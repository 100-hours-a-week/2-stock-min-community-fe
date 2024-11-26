const fs = require('fs');
const path = require('path');
const connection = require('../db');

// 파일 경로 설정
const filePath = path.join(__dirname, '../data/users.json');

// 사용자 데이터 가져오기
function getUsers(callback) {
  connection.query('SELECT * FROM USER', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}

function isEmailDuplicate(email) {
  const users = getUsers();
  return users.some((user) => user.email === email);
}

// 사용자 데이터 추가하기
function addUser(user, callback) {
  connection.query(
    `INSERT INTO USER VALUES (DEFAULT,${user.email},${user.profile_image},${user.password},${user.nickname}`
  );
  if (err) {
    return callback(err, null);
  }
  callback(null, results);
}
function deleteUser(email) {
  const users = getUsers();
  const deleteIndex = users.findIndex((user) => user.email === email);
  users.splice(deleteIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
  return true;
}
function patchUser(email, field, data) {
  const users = getUsers();
  const patchIndex = users.findIndex((user) => user.email === email);
  users[patchIndex][field] = data;
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
}

module.exports = { getUsers, addUser, isEmailDuplicate, deleteUser, patchUser };
