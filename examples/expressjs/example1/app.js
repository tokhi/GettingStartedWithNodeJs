var express = require('express'); // the required library
var app = express();

// root route
app.get('/', function (request, response) {
	// body...
	response.send('Hey Express!');
});


app.get('/help', function (request, response) {
	response.send('help page is under constrcution!');
});

app.get('/hello/:name?/:position?', function (request, response) {
	var name = request.params.name
	var position = request.params.position
	response.send('Hey <b>'+ name + '</b>,<br/> you are a great <b>' + position + '</b>');
});

app.get('*', function (request, response) {
	response.send('Oops, route not supported!');
});


var server = app.listen(3000, function () {
	console.log("Listening on port 3000");
})