const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const UserModel = require('../models/User');

const router = express.Router();

const generateToken = (user = {}) => {
  return jwt.sign({
    id: user.id,
  }, authConfig.secret, {
    expiresIn: 3600
  });
}

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const userId = (await UserModel.countDocuments()) + 1

  console.log('userId', userId)

  if (await UserModel.findOne({ email })) {
    return res.status(400).json({ error: true, message: 'E-mail já cadastrado' });
  }

  try {
    const User = new UserModel({
      id: userId,
      name: name,
      email: email,
      password: password,
    });
    await User.save();
    User.password = undefined;
    return res.json({
      name: User.name,
      email: User, email,
      id: userId,
      token: generateToken(User),
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

  if (password) {
    if (!await bcryptjs.compare(password, user.password)) {
      return res.status(400).send({
        error: true,
        message: 'Senha inválida'
      })
    };
  }

  user.password = undefined;

  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user),
  });
});

router.post('/logout', async (req, res) => {
  const { id } = req.body;
  const query = { id: id };
  const user = await UserModel.findOne(query).exec();
  if (!user) {
    return res.status(401).json({
      message: "Usuário não encontrado"
    })
  };

  const secret = process.env.JWT_SECRET;
  const bearerHeader = req.headers['authorization'];
  const bearerToken = bearerHeader.split(' ')[1];
  const decoded = jwt.verify(bearerToken, secret);

  // if (decoded.id != user.id) {
  //   return res.status(401).json({
  //     message: "Essas credenciais não correspondem aos nossos registros.  -- ID NÃO CORRESPONDE AO TOKEN"
  //   })
  // };

  if (blacklist.find((item) => item == bearerToken)) {
    return res.status(401).json({
      message: "Essas credenciais não correspondem aos nossos registros.  -- TOKEN INVÁLIDO"
    })
  };

  blacklist.push(bearerToken);

  return res.status(200).json({
    message: "Logout realizado com sucesso.",
  });
});

router.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const query = { id: userId };
  const { name, email, password } = req.body;
  const user = !password ? await UserModel.findOneAndUpdate(query, { name, email }, { new: true }) : await UserModel.findOneAndUpdate(query, { name, email, password }, { new: true });

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  })
})
module.exports = router;