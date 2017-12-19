module.exports.index = function(application, req, res){
		res.render('index', {validacao:{}, autenticacao:{}});
}

module.exports.autenticar = function(application, req, res){
		
		var dadosForm =  req.body;
		
		req.assert("usuario", "Usuario não pode ser vazio").notEmpty();
		req.assert("senha", "Senha não pode ser vazia").notEmpty();

		var errors = req.validationErrors();

		if(errors){
			res.render("index", {validacao: errors, autenticacao: {}});
			return;
		}

		var connection = application.config.db;
		var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

		UsuariosDAO.autenticar(dadosForm, req, res);

		//res.send("tudo ok para criar a sessão");
}