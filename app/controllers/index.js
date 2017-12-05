module.exports.index = function(application, req, res){
		res.render('index');
}

module.exports.autenticar = function(application, req, res){
		res.send('chegou aqui');
}