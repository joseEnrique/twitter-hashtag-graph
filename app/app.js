var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var zones = require('./routes/zones');
var control = require('./command');
var app = express();

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('views'));



app.use(morgan('dev')); /* 'default','short','tiny','dev' */
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
// MONGO
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('twitter', server);



app.get('/', function(request, response) {

  response.render('views/index.html', {
    titulo: 'SysGraph'
  });

});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected database");
        db.collection('pid', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

//************************************************************************


// WEBAPP
app.get('/list', function(request, response) {


	db.collection("graphs", function(err, collection) {
	        collection.find({}).toArray(function(err, items) {
	              response.render('views/list.html', {
	    				item: items
	  				});
	        });
	    });

});

app.get('/create', function(request, response) {


	response.render('views/create.html');
	    
	  
});




app.get('/graph/:collection', function(request, response) {

 		console.log(request.params.collection)
		  response.render('views/graphImages.html', {
		    titulo: 'Sysgraph'
		  });


});


app.get('/stats/:collection', function(request, response) {

 		console.log(request.params.collection)
		  response.render('views/graphImages.html', {
		    titulo: 'Sysgraph'
		  });


});





app.get('/api/v1/grafoprueba', function(request, response) {

  response.render('views/graphImages.html');

});
//**********





//CONTROLLER

app.post('/api/v1/start', control.startCommand);
app.post('/api/v1/stop/:name', control.deleteCommand);


//API




app.get('/api/v1/:collection/zones', zones.findAll);
app.get('/api/v1/:collection/zones/:node', zones.findByZone);

app.listen(3000);
console.log('Listening on port 3000...');
