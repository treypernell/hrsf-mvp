const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000
const app = express();

const routes = require('./routes.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', express.static('public'));

app.use('/sequence', routes);

app.listen(PORT, () => {
  console.log(`Now listening at port ${PORT}...`)
})