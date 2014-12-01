var http = require('http'); // add the http module
var server = http.createServer(function (request, response) {
	// body...
	response.writeHead(200, {"content-type" : "text/html"});
	response.write("<b>Hello</b> World");
	response.end();
}); // create a server 

server.listen(3000);
console.log("render localhost:3000 on your browser!");