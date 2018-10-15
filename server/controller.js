const { saveSequence, findSequences } = require('../database/controllers/sequence.js')

module.exports = {
  get: function(req, res) {
    console.log('GET REQUEST RECEIVED');
    findSequences(res.send.bind(res));
  },
  post: function(req, res) {
    console.log('POST REQUEST RECEIVED');
    console.log(req.body)
    saveSequence(req.body, res.send.bind(res));
  }
}