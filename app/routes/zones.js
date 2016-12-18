var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('twitter', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected database");
        db.collection('big_processed', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection(req.params.collection, function(err, collec) {
        console.log(collec)
        collec.find().toArray(function(err, items) {
            

            res.send(items);
        });
    });
};

exports.findByZone = function(req, res) {
    db.collection(req.params.collection, function(err, collection) {
        collection.find({time_zone:req.params.node}).toArray(function(err, items) {
            console.log(req.params.zone);
            res.send(items);
        });
    });
};
