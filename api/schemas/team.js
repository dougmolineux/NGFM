var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
	name: String,
	players: [{ 
		type : Mongoose.Schema.ObjectId, 
		ref: 'players'
	}];
});
