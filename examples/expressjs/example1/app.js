var express = require('express'); // the required library
var app = express();

// root route
app.get('/', function (request, response) {
	// body...
	response.send('Hey Express!');
});

var server = app.listen(3000, function () {
	console.log("Listening on port 3000");
})