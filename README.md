# Up and running with Nodejs & Expressjs

>Node.js® is a platform built on [Chrome's JavaScript runtime](https://code.google.com/p/v8/) for easily building fast, scalable network applications. Node.js uses an event-driven, [non-blocking I/O model](http://stackoverflow.com/questions/10570246/what-is-non-blocking-or-asynchronous-i-o-in-node-js) that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

install nodejs under ubuntu:

```bash
$ sudo apt-get install python-software-properties python g++ make
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
```
It installs current stable Node on the stable Ubuntu. Quantal (12.10) users may need to install the `software-properties-common` package for the add-apt-repository command to work: 

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

### Modules
A module encapsulates related code into a single unit of code. When creating a module, this can be interpreted as moving all related functions into a file.

A simple module demonstation:

`greetings.js`:

```javascript
module.exports = {

    sayHelloInEnglish: function() {
        return "Hello";
    },

    sayHelloInSpanish: function() {
        return "Hola";
    },

    sayHelloInPersian: function() {
        return "Salam";
    }
};
```
#### Importing a module
You can import a module using `require`:
```javascript
var greetings = require("./greetings.js");
```

This is how I imported the `greetings.js` to the simple `hello.js` example:

```javascript
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

```
Restart the server, then you should see the changes.
See the full example [here](https://github.com/tokhi/GettingStartedWithNodeJs/tree/master/examples/nodejs/example2)

## What is express.js
According to above `nodejs` basics you may find out that nodejs is quite tiny for building web applications. So for that it requires you to use `express.js`.

Express is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. You can use a variety of choices for your templating language (like [EJS](http://www.embeddedjs.com/), [Jade](http://jade-lang.com/), and [Dust.js](http://akdubya.github.io/dustjs/)).

You can then use a database like `MongoDB` with `Mongoose` (for modeling), `CouchDB`, `Nedb` and so on to provide a backend for your `Node.js` application. `Express.js` basically helps you manage everything, from routes, to handling requests and views.


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

### Using Templates
So far we have used `response.send(..)` for rendering content, but this is not the right way to do. Express let you to use templating engines to create powerful web pages; so you can choose which template engine you choose. By default there are two template engin options `jade` and `EJS`. `EJS` is more similar to html so thats why we prefer to use `EJS` for this tutorial.

To install `EJS` execute:
```
$ npm install ejs --save
```
So after installation you can add it to your application via:

```
app.set('view engine', 'ejs);
```
So now you need to create a new directory in your project called `views` and create a file called `default.ejs`

This is how our root route look like now:

```javascript
//...

// view engine
app.set('view engine', 'ejs');

// root route
app.get('/', function (request, response) {
	// body...
	response.render('default', {
		title : 'Home page',
		names: ['Ahmad', 'Mahmood', 'Kalbi', 'Maqsood']
	});
});

//...
```
To render the content now we have used the `response.render(...)` and you can define the variable which you like to pass to the view.

Our default view: `default.ejs`:

```html
<html>
<head>
	<meta charset="utf-8">
	<title><%= title %></title>
</head>
<body>
	<h1><%= title %></h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua.
	</p>
	<p>Array display:
		<ul>
			<% for( var i = 0 ; i <= names.length ; i++){ %>
			<li><%= names[i] %></li>
			<% } %>
		</ul>
	</p>

</body>
</html>
```
restart the server and then you see the changes on `localhost:3000`

#### Using Partials
Its quite easy to include partials to your view, you just need to add your partials in the `views` directory and then include them in your view.

Here we would like to add a `header` and `footer` for our template.

We careate a directory under views: `/views/partials` and then create two partials called `/views/partials/header.ejs` and `/views/partials/footer.ejs`.

`/views/partials/header.ejs`:

```html
<header> 
	<p> page header</p>
</header>
```

`/views/partials/footer.ejs`:

```html
<header> 
	<p> page header</p>
</header>
```

and you can include them to your view as below:

```html
<html>
<head>
	<meta charset="utf-8">
	<title><%= title %></title>
</head>
<body>
	<!-- includes partial header -->
	<% include partials/header.ejs %>

	<h1><%= title %></h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua.
	</p>
	<p>Array display:
		<ul>
			<% for( var i = 0 ; i < names.length ; i++){ %>
			<li><%= names[i] %></li>
			<% } %>
		</ul>
	</p>

	<!-- includes partial footer -->
	<% include partials/footer.ejs %>
</body>
</html>
```

#### Passing local variables to view
You can pass local variable to your view with out defining them in a specific route:

```javascript
// adding a local variable
app.locals.welcomeMsg = "Welcome to the "
```
and then you can add them to your view

```html
<h1><%= welcomeMsg %></h1>
```
Click [here](https://github.com/tokhi/GettingStartedWithNodeJs/blob/master/examples/expressjs/example2/app.js) to see the complete example.

#### Conditional templates
You can also check if a variable is undefined or not in the view:

```html
<div class="container">
	<!--    local var   -    var -->
	<h1><%= welcomeMsg %> <%= title %></h1>

	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua.
	</p>
	<% if(typeof(names) !== 'undefined') { %>
	<p>People names:
		<ul>
			<% for( var i = 0 ; i < names.length ; i++){ %>
			<li><%= names[i] %></li>
			<% } %>
		</ul>
	</p>
	<% } %>
</div>
````

### Modularize routes
You can alos modularize routes and put them in a sperate file, so to do that create another directory e.g; `routes` under your app root directory and then create a javascript file e.g; `routes/index.js`:

```javascript
// root route
exports.index = function (request, response) {
	// body...
	response.render('default', {
		title : 'Home page',
		names: ['Ahmad', 'Mahmood', 'Kalbi', 'Maqsood']
	});
}

exports.help =  function (request, response) {
	response.render('default', {
		title : 'Help page'
	});
}

exports.page404 = function (request, response) {
	response.render('404',{
		title: '404 page'
	});
}
```
As you can see we moved all the routes to that file.

Now you shoud add the route file to your `app.js` via `require` and then call the specific route as below:

`app.js`:

```javascript
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
```
You can see the whole example [here](https://github.com/tokhi/GettingStartedWithNodeJs/tree/master/examples/expressjs/example3).


### Content Structure
Install express-generator:

```
sudo npm install -g express-generator
```
Create the project:

```
 express -e tokMovies
 ```
This is a simple movie rating system which enables users to rate movies.
First we start by parsing movies from a json file. You can see the json file [here](https://github.com/tokhi/GettingStartedWithNodeJs/tree/master/examples/expressjs/example4/tokMovies).

Install dependencies:

 ```
$ cd tokMovies && npm install
```

We parse the `json` data to a local variable as below:

`app.js`:

```javascript
app.locals.moviesData = require('./movies.json');
```
This we can access it via `forEach` or `for` loop in the view:

```html
<!DOCTYPE html>
<html lang="en">

<% include head.ejs %>

<body id="page-top" class="index">

    <!-- navigation -->
    <% include nav.ejs %>
    <% include header.ejs %>
    <% include profolio.ejs %>
    <% include about.ejs %>
   	<% include contact.ejs %>
    <% include footer.ejs %>
    <div class="scroll-top page-scroll visible-xs visble-sm">
        <a class="btn btn-primary" href="#page-top">
            <i class="fa fa-chevron-up"></i>
        </a>
    </div>
    
    <!-- accessing the json local variable -->
    <% for(var i=1; i<moviesData.length; i++){ %>
    <% include single_profolio.ejs %>
    <% } %>

   <% include jsfile.ejs %>

</body>

</html>

```
See the whole project [here](https://github.com/tokhi/GettingStartedWithNodeJs/tree/master/examples/expressjs/example4/tokMovies).

Run the app:
 ```
 $ DEBUG=tokMovies ./bin/www
 ```
Now if you browse `localhost:3000` you should see the index page.



For this example I have used [this free bootstrap template](http://startbootstrap.com/template-overviews/freelancer/). 


## Heroku Deployment
coming soon...

---
More parts coming next...


