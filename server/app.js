const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/userRoutes');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../Public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v4', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
