// npm i body-parser --save
// npm i express --save
// npm i mongoose --save
// npm i -g nodemon - помогает увидеть изменения без перезапуска сервера
// mongoDB should be started

// Чтобы подружить монгу, базы данных и так далее. Надо в одном терминале запустить mongod, добавить path путь до mongo.exe и в этом же терминале работать. 
// use DataBaseName - используем базу данных с именем DataBaseName. Добавлять лучше через монгобустер
// show collections - показывает какие есть коллекции
// db.createCollection('collectionNAME') - создаем новую коллекцию
// db.COLLECTION_NAME.insert({'name': 'MY_OWN_NAME'})
// npm install mongoose@3.6.0rc0  - нормальная версия MONGO, а то новая просто пиздец.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Берем жанры
Genre = require('./models/genres.js');
Book = require('./models/book.js');


// Connect to mongoose. Создаем просто базу данных, коннектясь в несуществующей
mongoose.connect('mongodb://localhost:27017/myNewDB');

var db = mongoose.connection;

mongoose.connection.on('connected', function() {
	console.log('Connected to DB! Ueeehhha!')
})

mongoose.connection.on('error', function(err) {
  console.log('Database error: ' + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}))
// Rout

app.get('/', function(req, res) {
	res.send('mess!');
});

app.get('/genres', function(req, res){
	Genre.getGenres(function(error, request){
		if(error) throw error;
		res.json(request);
	})
})

app.get('/book', function(req, res){
	Book.getBooks(function(err, books) {
		if(err) {
			throw err;
		}
		res.json(books)
	})
})


app.listen(3000);

console.log('Run on port 3000...');

