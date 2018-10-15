const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mvp');
db = mongoose.connection;
//PULLED FROM SA WEEK 10;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = db;