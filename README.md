# Up and running with Nodejs & express.js
install nodejs under ubuntu:

```bash
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```
Check [this link](http://nodejs.org/download/) for windows installation


After installation, check the `nodejs` version:

```nodejs
$ node --version
v0.10.29
```

## Simple hello world web app:

```nodejs
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

## NPM package management
to start with the package management in node execute the command:

```nodejs
npm init
```

It ask you some questions like `appname`, `version` and so on and will generate a `package.json` file in your directory that looks as below:

```nodejs
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

```nodejs
npm install gulp --save
```
after installing the package you can see a new directory in your project called `node_modules/gulp` which contains the module files, and the install command also update your `package.json` file with which defines your project needs this package as dependency:

```nodejs

  "name": "NodeGettingStarted",
  ...,
  "dependencies": {
    "gulp": "^3.8.10"
  }
}
```

Now you can even delete the `node_module` directory and you can build the project with all the dependencies via below command:

```nodejs
npm install
```
