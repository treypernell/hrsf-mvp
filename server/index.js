const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000
const app = express();

app.use(morgan('dev'));

app.use('/', express.static('public'));

app.listen(PORT, () => {
  console.log(`Now listening at port ${PORT}...`)
})