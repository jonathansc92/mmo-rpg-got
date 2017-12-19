// import mongodb
var mongo = require('mongodb');

var connMongoDB = function(){
	//console.log('Entrou na função de conexão');
	var db = new mongo.Db(
		'got', 
		new mongo.Server(
			'localhost', // string content address server
			'27017', // port conection
			{} // Object Option configuration server
		),
		{} // Object Configuration optionals
	);

	return db;
}

module.exports = function(){

	return connMongoDB;

}