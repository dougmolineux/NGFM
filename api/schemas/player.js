var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
	name: String,
	position: String,
	attributes: {
		att: Number,
		def: Number,
		speed: Number,
		strength: Number
	}, odds: {
		dribble: Number,
		shoot: Number,
		pass: Number
        }
});
