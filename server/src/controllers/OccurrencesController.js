const express = require('express');
const dayjs = require('dayjs');

const OccurrenceModel = require('../models/Occurrence');

const router = express.Router();

router.post('/occurrences', async (req, res) => {
  const { registered_at, local, occurrence_type, km, user_id } = req.body;
  const id = (await OccurrenceModel.countDocuments()) + 1;

  if (dayjs(registered_at).isAfter(dayjs())) {
    return res.status(400).json({ error: true, message: "Você não pode cadastrar uma data futura." });
  }

  if (occurrence_type > 10 && occurrence_type < 1) {
    return res.status(400).json({ error: true, message: "Tipo de ocorrência inválido." });
  }

  try {
    const Occurrence = new OccurrenceModel({
      id: id,
      registered_at: registered_at,
      local: local,
      occurrence_type: occurrence_type,
      km: km,
      user_id: user_id
    });
    await Occurrence.save();
    console.log("Ocorrência registrada!");
    return res.status(201).json({
      error: false,
      message: "Occurrence registered with success!"
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
});

router.get('/occurrences', async (req, res) => {
  try {
    const occurrences = await OccurrenceModel.find();
    console.log("Ocorrências encontradas!");
    return res.status(200).send(occurrences);
  }
  catch (err) {
    console.log("Nenhuma ocorrência foi encontrada!");
    return res.status(400).json({
      message: "Nenhuma ocorrência foi encontrada!"
    })
  }
});

module.exports = router;