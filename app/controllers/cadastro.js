module.exports.cadastro = function(application, req, res){
		res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){
		//res.send('Teste - Vamos cadastrar');

		var dadosForm = req.body;

		req.assert('nome', 'Nome não pode ser vazio').notEmpty();
		req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
		req.assert('senha', 'Senha não pode ser vazio').notEmpty();
		req.assert('casa', 'Casa deve estar marcada').notEmpty();

		var errors = req.validationErrors();

		if(errors){
			res.render('cadastro', {validacao: errors, dadosForm: dadosForm});
			return;
		}

		var connection = application.config.db;
		//console.log(connection);

		var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

		UsuariosDAO.inserirUsuario(dadosForm);

		res.send('podemos cadastrar')


		//res.render('cadastro');
}