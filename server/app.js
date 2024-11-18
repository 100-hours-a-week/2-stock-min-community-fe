const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/userRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../Public')));

app.use(
  session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60000,
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
