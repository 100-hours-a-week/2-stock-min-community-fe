const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'Html', 'user_login.html'));
});
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userData = {
    email: email,
    password: password,
  };

  fs.writeFile('data.json', JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).json({ message: '파일 저장 중 오류가 발생했습니다.' });
    } else {
      console.log('File has been saved!');
      res.sendFile(path.join(__dirname, 'Public', 'Html', 'user_login.html'));
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
