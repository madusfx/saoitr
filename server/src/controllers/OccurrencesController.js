const express = require('express');
const dayjs = require('dayjs');

const OccurrenceModel = require('../models/Occurrence');

const router = express.Router();

router.post('/occurrences', async (req, res) => {
  const { registered_at, local, occurrence_type, km, user_id } = req.body;
  const lastObject = await OccurrenceModel.findOne().sort({ _id: -1 }).exec();
  const id = lastObject?.id ? lastObject.id + 1 : 1;

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
      id: id,
      registered_at: registered_at,
      local: local,
      occurrence_type: occurrence_type,
      km: km,
      user_id: user_id
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

router.get('/occurrences/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const query = { user_id: userId };

  try {
    const occurrences = await OccurrenceModel.find(query);
    console.log("Ocorrências do usuário encontradas!");
    return res.status(200).send(occurrences);
  }
  catch (err) {
    console.log("Nenhuma ocorrência desse usuário foi encontrada!");
    return res.status(400).json({
      message: "Nenhuma ocorrência desse usuário foi encontrada!"
    })
  }
});

router.put('/occurrences/:occurrenceId', async (req, res) => {
  const { occurrenceId } = req.params;
  const query = { id: occurrenceId };
  const { registered_at, local, occurrence_type, km } = req.body;

  try {
    await OccurrenceModel.findOneAndUpdate(query, { registered_at, local, occurrence_type, km }, { new: true });
    console.log("Ocorrência atualizada com sucesso!");
  }
  catch (err) {
    console.log("Ocorrência não encontrada!");
    return res.status(400).json({
      message: "Ocorrência não encontrada!"
    })
  }

  const occurrence = await OccurrenceModel.findOne(query);

  res.status(200).json({
    registered_at: occurrence.registered_at,
    local: occurrence.local,
    occurrence_type: occurrence.occurrence_type,
    km: occurrence.km,
    id: occurrence.id,
    user_id: occurrence.user_id
  });
});

router.delete('/occurrences/:occurrenceId', async (req, res) => {
  const { occurrenceId } = req.params;
  const query = { id: occurrenceId };

  try {
    const occurrence = await OccurrenceModel.findOneAndDelete(query);
    console.log("Ocorrência deletada com sucesso!");
    return res.status(200).send(occurrence);
  }
  catch (err) {
    console.log("Ocorrência não encontrada!");
    return res.status(400).json({
      message: "Ocorrência não encontrada!"
    })
  }
})

module.exports = router;