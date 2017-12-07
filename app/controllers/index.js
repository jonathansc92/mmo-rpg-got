module.exports.index = function(application, req, res){
		res.render('index');
}

module.exports.autenticar = function(application, req, res){
		
		var dadosForm =  req.body;
		
		req.assert("usuario", "Usuario não pode ser vazio").notEmpty();
		req.assert("senha", "Senha não pode ser vazia").notEmpty();

		var errors = req.validationErrors();

		if(errors){
			res.render("index", {validacao: errors});
			return;
		}

		res.send("tudo ok para criar a sessão");
}