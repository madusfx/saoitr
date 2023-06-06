require("dotenv").config();
const express = require('express');
var cors = require('cors')
const database = require('../src/database');

const UserController = require('./controllers/UserController');
const OcurrencesController = require('./controllers/OcurrencesController');
const AdminController = require('./controllers/AdminController');
const authenticateMiddleware = require('./middlewares/authenticate');

const app = express();

global.blacklist = [];

app.use(cors());
app.use(express.json());
app.use("/", UserController);
app.use("/", OcurrencesController);
app.use("/admin", authenticateMiddleware, AdminController);

app.listen(24100, () => {
  console.log('Server is runing');
});