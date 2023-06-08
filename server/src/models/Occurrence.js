const mongoose = require('mongoose');

const OccurrenceSchema = new mongoose.Schema({
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

const Occurrence = mongoose.model("Occurrence", OccurrenceSchema);

module.exports = Occurrence;