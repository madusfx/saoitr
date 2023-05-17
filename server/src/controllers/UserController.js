const express = require('express');

const UserModel = require('../models/User');

const router = express.Router();

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
      data: User
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;