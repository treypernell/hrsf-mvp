const db = require('../index.js');
const Sequence = require('../models/sequence.js');

module.exports = {
  saveSequence: function(sequenceParams, callback) {
    let seq = new Sequence(sequenceParams);
    seq.save()
      .then((success) => {
        callback(200);
      })
      .catch((err) => {
        console.log(err);
      })
  },
  findAllSequences: function(callback) {
    Sequence.find()
      .exec((err, result) => {
        if (err) console.log(err)
        return callback(result);
      })
  },
  findOneSequence: function(sequenceName, callback) {
    Sequence.find({ name: sequenceName})
      .exec((err, result) => {
        if (err) console.log(err)
        console.log('DB RESULT', result);
      return callback(result);
      })
  }
}