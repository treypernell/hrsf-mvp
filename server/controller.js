const { saveSequence, findAllSequences, findOneSequence } = require('../database/controllers/sequence.js')

module.exports = {
  getAll: function(req, res) {
    console.log('GET REQUEST RECEIVED');
    findAllSequences(res.send.bind(res));
  },
  getOne: function(req, res) {
    console.log('GET ONE REQUEST RECEIVED');
    findOneSequence(req.params.sequenceName, res.send.bind(res));
    // console.log(req.params.sequenceName)
  },
  post: function(req, res) {
    console.log('POST REQUEST RECEIVED');
    console.log(req.body)
    saveSequence(req.body, res.send.bind(res));
  }
}