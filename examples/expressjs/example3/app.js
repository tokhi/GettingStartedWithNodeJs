var express = require('express'); // the required library
var app = express();
var routes = require('./routes')
// view engine
app.set('view engine', 'ejs');

// adding a local variable
app.locals.welcomeMsg = "Welcome to the "

app.get('/', routes.index);
app.get('/help', routes.help);
app.get('*', routes.page404);

var server = app.listen(3000, function () {
	console.log("Listening on port 3000");
})