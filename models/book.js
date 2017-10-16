var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	title: {
		type: String
	}
},
	{
		versionKey: ''
	}
);


var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = function(callback) {
	Book.find(callback);
}


module.exports.getOneBook = function(id, callback) {
	Book.findById(id, callback);
}

module.exports.addOneBook = function(bookObject, callback) {
	Book.create(bookObject, callback);
}

module.exports.removeOneBook = function(bookObject, callback) {
	Book.remove(bookObject, callback);
}