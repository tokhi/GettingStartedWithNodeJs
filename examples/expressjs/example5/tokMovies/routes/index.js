var express = require('express');
var router = express.Router();
var db = require("../db/nedb");


/* GET home page. */
router.get('/', function(req, res) {
    var movies = db.getAllMovies();

    movies.then(function(result) {
	    res.render('index', {
	        title: 'Express',
	        moviesData: result,
	        movie: result[0]
	    });
	},
	function(error) {
	    throw error;
	});

    // console.log(movies);

});

/* GET movie  */
router.get('/movies/:id', function(req, res) {
    var id = req.params.id
    var movie = db.findMovie(id);

	movie.then(function(result) {
        console.log(result);
        res.render('movie', {
            title: 'Express',
            movie: result
        });
    },
    function(error) {
        throw error;
    });
});

/* new movie */
router.get('/:id', function(req, res) {
	var id = req.params.id

     res.redirect('/movies/'+id);
});

/* POST movie */
router.post('/new', function(req, res) {
    var doc = {
        name: req.body.name,
        rating: req.body.rating,
        availability: req.body.availability,
        thumb: req.body.thumb,
        review: req.body.review
    }

    db.saveMovie(doc);
    res.redirect('/');
});

/* Rate movie */
router.post('/rate', function(req, res) {
    /* To-do...  Your Exercise ;)  */
});


module.exports = router;