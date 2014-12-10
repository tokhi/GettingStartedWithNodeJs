module.exports = {

	 saveMovie: function(doc) {
	 	var Datastore = require('nedb')
  		, db = new Datastore({ filename: 'movies.db', autoload: true });

	 	console.log("save function");
	 	console.log(doc)
        db.insert(doc, function (err, newDoc) {
        console.log("inserted successfully..");	
        });
    }
    
};