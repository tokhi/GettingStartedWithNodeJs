var express = require('express');
var router = express.Router();
var movies = require('../movies.json');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET movie  */
router.get('/movies/:id', function(req, res) {
  var id = req.params.id
  // get movie by id
  var movie = movies.filter(function(item) {
    return item.id == id;
  });

  res.render('movie', { title: 'Express', moviesData: movie });
});

module.exports = router;
