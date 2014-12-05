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