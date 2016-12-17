var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var wine = require('./routes/wines');
var app = express();
app.use(morgan('dev')); /* 'default','short','tiny','dev' */
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.get('/wines', wine.findAll);

app.listen(3000);
console.log('Listening on port 3000...');
