const fs = require('fs');
const path = require('path');

// 파일 경로 설정
const filePath = path.join(__dirname, '../data/users.json');

// 사용자 데이터 가져오기
function getUsers() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

function isEmailDuplicate(email) {
  const users = getUsers();
  return users.some((user) => user.email === email);
}

// 사용자 데이터 추가하기
function addUser(user) {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
}
function deleteUser(email) {
  const users = getUsers();
  const deleteIndex = users.findIndex((user) => user.email === email);
  users.splice(deleteIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
  return true;
}

module.exports = { getUsers, addUser, isEmailDuplicate, deleteUser };
