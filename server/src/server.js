require("dotenv").config();
const express = require('express');
const database = require('../src/database');

const UserController = require('./controllers/UserController');
const app = express();

app.use(express.json());
app.use("/users", UserController);

app.listen(3001, () => {
  console.log('Server is runing');
});