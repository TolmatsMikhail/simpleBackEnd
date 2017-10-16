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
// db.COLLECTION_IN_DB_NAME.drop() -  удаляет COLLECTION_IN_DB_NAME с именем коллекцию в базе
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Берем жанры
var Genre = require('./models/genres.js');
var Book = require('./models/book.js');


// Connect to mongoose. Создаем просто базу данных, коннектясь в несуществующей
mongoose.connect('mongodb://localhost:27017/new', 
	{ useMongoClient: true }
);

var db = mongoose.connection;

mongoose.connection.on('connected', function() {
	console.log('Connected to DB! ####################!');
});

mongoose.connection.on('error', function(err) {
  console.log('Database error: ' + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// Headers options
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
});
// Rout

app.get('/', function(req, res) {
	res.send('Welcomec to Express + MongoDB!');
});

app.get('/genres', function(req, res){
	Genre.getGenres(function(error, request){
		if(error) {
			throw error
		};
		res.json(request);
	});
});

app.post('/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre , function(error, genre){
		if(error) {
			throw error
		};
		res.json(genre);
	});
});

app.post('/books', function(req, res){
	var book = req.body;
	Book.addOneBook(book , function(error, book){
		if(error) {
			throw error
		};
		res.json(book);
	});
});

app.get('/books', function(req, res){
	Book.getBooks(function(err, result) {
		if(err) {
			throw err;
		};
		res.json(result);
	}); 
});

app.delete('/books', function(req, res){
	Book.removeOneBook(req.params.title, function(err, result) {
		if(err) {
			throw err;
		};
		res.json(result);
	}); 
});

app.get('/books/:_id', function(req, res){
	Book.getOneBook(req.params._id, function(err, book) {
		if(err) {
			throw err;
		};
		res.json(book);
	});
});


app.listen(3000);

console.log('Run on port 3000...');

