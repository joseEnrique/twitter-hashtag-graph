var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var zones = require('./routes/zones');
var app = express();

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('views'));



app.use(morgan('dev')); /* 'default','short','tiny','dev' */
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());





app.get('/', function(request, response) {

  response.render('views/index.html', {
    titulo: 'Hola, desde el controlador de home'
  });

});


app.get('/grafoprueba', function(request, response) {

  response.render('views/grafo.html');

});



app.get('/api/v1/:collection/zones', zones.findAll);
app.get('/api/v1/:collection/zones/:node', zones.findByZone);

app.listen(3000);
console.log('Listening on port 3000...');
