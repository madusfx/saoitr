const express = require('express');

const OcurrenceModel = require('../models/Ocurrence');

const router = express.Router();

router.post('/ocurrences', async (req, res) => {
  const { registered_at, local, occurrence_type, km, user_id } = req.body;
  const id = (await OcurrenceModel.countDocuments()) + 1;

  try {
    const Ocurrence = new OcurrenceModel({
      id: id,
      registered_at: registered_at,
      local: local,
      occurrence_type: occurrence_type,
      km: km,
      user_id: user_id
    });
    await Ocurrence.save();
    console.log("Ocorrência registrada!");
    return res.json({
      error: false,
      message: "Ocurrence registered with success!"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});

router.get('/ocurrences', async (req, res) => {
  try {
    const ocurrences = await OcurrenceModel.find();
    console.log("Ocorrências encontradas!");
    return res.status(200).json({
      ocurrences,
      message: "Sucesso!"
    })
  }
  catch (err) {
    console.log("Nenhuma ocorrência foi encontrada!");
    return res.status(400).json({
      message: "Nenhuma ocorrência foi encontrada!"
    })
  }
})

module.exports = router;