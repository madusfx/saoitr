const mongoose = require('mongoose');

const OcurrenceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  registered_at: {
    type: String,
    required: true
  },
  local: {
    type: String,
    required: true,
  },
  occurrence_type: {
    type: Number,
    required: true,
  },
  km: {
    type: Number,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  }
});

const Ocurrence = mongoose.model("Ocurrence", OcurrenceSchema);

module.exports = Ocurrence;