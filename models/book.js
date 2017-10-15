var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	name: {
		type: String
	}   
});


var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = function(callback) {
	Book.find(callback);
}