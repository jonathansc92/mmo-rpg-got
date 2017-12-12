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

JogoDAO.prototype.iniciaJogo =  function(res, usuario, casa, comando_invalido){
//	console.log('Iniciar');
this._connection.open( function(error, mongoclient){

	mongoclient.collection("jogo", function(error, collection){
		collection.find({
			usuario: usuario
		}).toArray(function(err, result){
			
		//	console.log(result[0]);

			res.render('jogo', {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido})
			
			mongoclient.close();
		});	
	});	
});
}

module.exports = function(){
	return JogoDAO;
}