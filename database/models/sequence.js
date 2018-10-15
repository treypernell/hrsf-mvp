const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  name: String,
  scale: String,
  tempo: Number,
  gridChords: [],
});

const Sequence = mongoose.model('sequence', sequenceSchema);

module.exports = Sequence;