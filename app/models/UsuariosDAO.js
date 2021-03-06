
// Import module cryto
var crypto = require("crypto");


function UsuariosDAO(connection){
	//console.log('object load!');
	this._connection = connection();
}


UsuariosDAO.prototype.inserirUsuario = function(usuario){
	//console.log(usuario)
	this._connection.open( function(error, mongoclient){

		mongoclient.collection("usuarios", function(error, collection){
		//	console.log(usuario);

		var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");		

		//	console.log(senha_criptografada);	

		usuario.senha = senha_criptografada;

		collection.insert(usuario);

		mongoclient.close();
	});	

	});
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	this._connection.open( function(error, mongoclient){

		mongoclient.collection("usuarios", function(error, collection){

			var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");		
			usuario.senha = senha_criptografada;


			collection.find(usuario).toArray(function(err, result){
				//console.log(result);

				if(result[0] != undefined){

					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;

					req.session.casa = result[0].casa;

				}

				if(req.session.autorizado){
					res.redirect('jogo');
				}else{
					res.render('index', {validacao: {}, autenticacao: 'Usuário ou senha inválidos'});
				}
			});

			mongoclient.close();
		});	

	});
}

module.exports = function(){
	return UsuariosDAO;
}