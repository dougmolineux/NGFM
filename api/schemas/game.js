var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
	homeTeam: Mongoose.Schema.ObjectId,
	homeScore: Number,
	awayTeam: Mongoose.Schema.ObjectId,
        awayScore: Number,
});
