const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const UserModel = require('../models/User');

const router = express.Router();

const generateToken = (user = {}) => {
  return jwt.sign({
    id: user.id,
    name: user.name
  }, authConfig.secret, {
    expiresIn: 3600
  });
}

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (await UserModel.findOne({ email })) {
    return res.status(400).json({ error: true, message: 'E-mail já cadastrado' });
  }

  try {
    const User = new UserModel({
      name: name,
      email: email,
      password: password,
    });
    await User.save();
    User.password = undefined;
    return res.json({
      error: false,
      message: "Registered with success!",
      data: User,
      token: generateToken(User)
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      error: true,
      message: 'Usuário não cadastrado.'
    })
  }

  if (!await bcryptjs.compare(password, user.password)) {
    return res.status(400).send({
      error: true,
      message: 'Senha inválida'
    })
  };

  user.password = undefined;

  return res.json({
    user,
    token: generateToken(user)
  });

})

module.exports = router;