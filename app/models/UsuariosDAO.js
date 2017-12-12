function UsuariosDAO(connection){
	//console.log('object load!');
	this._connection = connection();
}


UsuariosDAO.prototype.inserirUsuario = function(usuario){
	//console.log(usuario)
	this._connection.open( function(error, mongoclient){

		mongoclient.collection("usuarios", function(error, collection){
			collection.insert(usuario);

			mongoclient.close();
		});	

	});
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	this._connection.open( function(error, mongoclient){

		mongoclient.collection("usuarios", function(error, collection){
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
					res.render('index', {validacao: {}});
				}
			});

			mongoclient.close();
		});	

	});
}

module.exports = function(){
	return UsuariosDAO;
}