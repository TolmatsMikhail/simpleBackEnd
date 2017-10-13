var mongoose = require('mongoose');

// create Schema

var genreSchema = mongoose.Schema({
	name: {
		type: String
	}
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

//get genres

module.exports.getGenres = function(callback) {
	Genre.find(callback);
}