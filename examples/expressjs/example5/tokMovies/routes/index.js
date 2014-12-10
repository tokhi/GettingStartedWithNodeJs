var express = require('express');
var router = express.Router();
var movies = require('../movies.json');
var db = require("../db/nedb");
// var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Express',
       	moviesData: movies
    });
});

/* GET movie  */
router.get('/movies/:id', function(req, res) {
    var id = req.params.id
        // get movie by id
    var movie = movies.filter(function(item) {
        return item.id == id;
    });

    res.render('/movie', {
        title: 'Express',
        moviesData: movie
    });
});

/* new movie */
router.get('/new', function(req, res) {
 
    res.render('new', {
        title: 'Express'
    });
});

/* POST movie */
router.post('/movies', function(req, res) {
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

module.exports = router;