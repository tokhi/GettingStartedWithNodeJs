var Datastore = require('nedb')
  		, db = new Datastore({ filename: 'movies.db', autoload: true });
var Promise = require('promise');

module.exports = {

	 saveMovie: function(doc) {
	 console.log("save function");
	 	console.log(doc);
        db.insert(doc, function (err, newDoc) {
        console.log("inserted successfully..");	
        });
    },

    getAllMovies: function () {
    	function getMovies () {
    		var promise = new Promise(function (fulfill, reject){
    			db.find({ }, function (err, docs) {
    				if (err) reject(err);
			    	else fulfill(docs);
			    });
			  });
    		
    		return promise;
    	}
		return getMovies();
    },

    findMovie: function (id) {
    	function getMovie (id) {
    		var promise = new Promise(function (fulfill, reject){

    			db.findOne({ _id: id }, function (err, doc) {
    				if (err) reject(err);
			    	else fulfill(doc);
			    });
			  });
    		
    		return promise;
    	}
		return getMovie(id);
    },

    updateRating: function (rating, id) {
    	db.update({ _id: id }, { $set: { rating: rating } }, { multi: true }, function (err, numReplaced) {
			console.log("updated successfully..");	
		});
    }
    
};