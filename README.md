# Up and running with Nodejs & Expresjs
install nodejs under ubuntu:

```bash
$ sudo apt-get install python-software-properties python g++ make
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
```
It installs current stable Node on the current stable Ubuntu. Quantal (12.10) users may need to install the `software-properties-common` package for the add-apt-repository command to work: 

```
sudo apt-get install software-properties-common
```

Check [this link](http://nodejs.org/download/) to install `nodejs` in Mac or Windows.


After installation, check the `nodejs` version:

```javascript
$ node --version
v0.10.29
```

## Simple nodejs hello world app

```javascript
var http = require('http'); // add the http module
var server = http.createServer(function (request, response) {
	// body...
	response.writeHead(200, {"content-type" : "text/html"});
	response.write("<b>Hello</b> World");
	response.end();
}); // create a server 

server.listen(3000);
console.log("render localhost:3000 on your browser!");
```

To Run you first app:

```
$ node hello.js
render localhost:3000 on your browser!
```

Access the app on [http://localhost:3000](http://localhost:3000)

## NPM package management
to start with the package management in node execute the command:

```javascript
$ npm init
```

It ask you some questions like `appname`, `version` and so on and will generate a `package.json` file in your directory that looks as below:

```json
{
  "name": "NodeGettingStarted",
  "version": "1.0.0",
  "description": "getting started with nodejs and express.js",
  "main": "hello.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "tokhi"
}

```
Its just a `json` file, and you can change the values based on your needs.

### Installing packages
You can install any package simply by using `npm install`:

```bash
$ npm install gulp --save
```
after installing the package you can see a new directory in your project called `node_modules/gulp` which contains the module files, and the install command also update your `package.json` file; which defines your project needs this package as a dependency:

```javascript

  "name": "NodeGettingStarted",
  ...,
  "dependencies": {
    "gulp": "^3.8.10"
  }
}
```

Now you can even delete the `node_modules` directory and you can build the project with all the dependencies via below command:

```bash
$ npm install
```

## What is express.js
According to above `nodejs` basics you may find out that nodejs is quite tiny for building web applications. So for that it requires you to use `expre.js`.

Express is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. You can use a variety of choices for your templating language (like `EJS`, `Jade`, and `Dust.js`).

You can then use a database like `MongoDB` with `Mongoose` (for modeling) to provide a backend for your `Node.js` application. `Express.js` basically helps you manage everything, from routes, to handling requests and views.


### Express.js installation
To install express.js globally:
```bash
$ npm install  -g express
```

Mac users may need to use `express-generator` for installation:

```
$ sudo npm install -g express-generator
```
After successfull installation you should be able to check the version:

```
$ express --version
4.9.0
```

### Simple expressjs hello world app:
The first thing you need to do is to create the package and install `expressjs`:

```bash
$ npm init
$ npm install express --save # this will add express as a dependency in package.json file
```
Create a file called `app.js`:

```javascript
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
```
As you can see in the above example we even don't need to specify the mime type, so this means building applications in `expressjs` is a little bit simpler than `node`.

To run the app:

```bash
$ node app.js # Listening on port 3000
```
Access the app on [http://localhost:3000](http://localhost:3000).

You can find the rest of the methods that you can use in `express` in the documentation page ([API Reference](http://expressjs.com/4x/api.html)).

### Playing with routes
Via routes you can render different pages to your clients, as you see in above there is only a `/` route in the app, here we are going to add some more routes.

`app.js`:

```javascript
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
```
- `/help` route only redners a message.

- `/hello/:name?/:position?` here the `:name?` and `:position?` are the parameters so you can pass any parameter here and then you could get the parameters from the request via `request.params.name` and `request.params.position`

- `*` route triggers any none supported url that you pass.

Run the app via `node app.js` and click the links to check the routes that we have just created:

- [http://localhost:3000/help](http://localhost:3000/help)
- [http://localhost:3000/hello/ahmad/student](http://localhost:3000/hello/ahmad/student)
- [http://localhost:3000/foo](http://localhost:3000/foo)


