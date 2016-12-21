var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('twitter', server);

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

exports.findAll = function(req, res) {
    console.log(req.params.collection)
    db.collection(req.params.collection+"_processed", function(err, collec) {
        console.log(collec)
        collec.find().toArray(function(err, items) {


            res.send(items);
        });
    });
};

exports.findByZone = function(req, res) {
    console.log(req.params.collection)
    db.collection(req.params.collection+"_processed", function(err, collection) {
        collection.find({time_zone:req.params.node}).toArray(function(err, items) {
            console.log(req.params.zone);
            res.send(items);
        });
    });
};


exports.tweetsbyZone = function(req,res){

    console.log(req.params.collection)
    db.collection(req.params.collection, function(err, collection) {
        collection.aggregate([ {'$unwind': '$user.time_zone'},{'$group': {'_id': '$user.time_zone', 'count': {'$sum': 1}}}, { $sort : { 'count' : -1}}]).toArray(function(err, items) {
            res.send(items);
        });
    });


};


exports.maxuser = function(req,res){

    console.log(req.params.collection)
    db.collection(req.params.collection, function(err, collection) {
        collection.aggregate([ {'$unwind': '$user.screen_name'},{'$group': {'_id': '$user.screen_name', 'count': {'$sum': 1}}}, { $sort : { 'count' : -1}}]).toArray(function(err, items) {
            console.log(items[0])
            res.send(items[0]);
        });
    }); 


};


exports.total = function(req,res){

    console.log(req.params.collection)
    db.collection(req.params.collection, function(err, collection) {
         collection.count({}, function(err, count) {
            //console.log(typeof(count))
            res.send(count.toString());
         })
    });


};