var http = require('http'); // add the http module
var greetings = require('./greetings.js');
var server = http.createServer(function (request, response) {
	// body...
	response.writeHead(200, {"content-type" : "text/html"});
	response.write("Hello In English: <b>" + greetings.sayHelloInEnglish());
	response.write("<br/>Hello In Spanish: <b>" + greetings.sayHelloInSpanish());
	response.write("<br/>Hello In Persian: <b>" + greetings.sayHelloInPersian());
	response.end();
}); // create a server 

server.listen(3000);
console.log("render localhost:3000 on your browser!");