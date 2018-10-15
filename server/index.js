const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000
const app = express();

const routes = require('./routes.js');

app.use(morgan('dev'));
app.use('/', express.static('public'));

app.use('/sequence', routes);

app.listen(PORT, () => {
  console.log(`Now listening at port ${PORT}...`)
})