var express = require('express'); // the required library
var app = express();
// view engine
app.set('view engine', 'ejs');

// adding a local variable
app.locals.welcomeMsg = "Welcome to the "

// root route
app.get('/', function (request, response) {
	// body...
	response.render('default', {
		title : 'Home page',
		names: ['Ahmad', 'Mahmood', 'Kalbi', 'Maqsood']
	});
});


app.get('/help', function (request, response) {
	response.render('default', {
		title : 'Help page',
		names: ['Ahmad', 'Mahmood', 'Kalbi', 'Maqsood']
	});
});


app.get('*', function (request, response) {
	response.render('404',{
		title: '404 page'
	});
});


var server = app.listen(3000, function () {
	console.log("Listening on port 3000");
})