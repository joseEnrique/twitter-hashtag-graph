app.get('/Work', function(req, res){

    var counter = 0;

    //connect to my first collection
    db.collection('my-collection1').find().each( function (err,doc) {
        if(err) throw err;

        //...do stuff here to your docs here to get a value for x

        //once there are no more docs, add one to the counter
        if (!doc) {
            console.dir("No document found");
            counter++;

            if (counter == 2) {
                res.render('Work', { "x" : x, "y" : y });
            }
        }
    });

    db.collection('my-collection2').find().each( function (err,doc) {
        if(err) throw err;

        //...do stuff here to your docs here to get a value for x

        //once there are no more docs, add one to the counter
        if (!doc) {
            console.dir("No document found");
            counter++;

            if (counter == 2) {
                res.render('Work', { "x" : x, "y" : y });
            }
        }
    });

});