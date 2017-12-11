function JogoDAO(connection){
	//console.log('object load!');
	this._connection = connection();
}


JogoDAO.prototype.gerarParametros =  function(usuario){
		this._connection.open( function(error, mongoclient){

		mongoclient.collection("jogo", function(error, collection){
			collection.insert({
				usuario: usuario,
				moeda: 15,
				suditos: 10,
				temor: Math.floor(Math.random() * 100),
				sabedoria: Math.floor(Math.random() * 100),
				comercio: Math.floor(Math.random() * 100),
				magia: Math.floor(Math.random() * 100)
			});

			mongoclient.close();
		});	

	});
}

module.exports = function(){
	return JogoDAO;
}