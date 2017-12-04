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


module.exports = function(){
	return UsuariosDAO;
}