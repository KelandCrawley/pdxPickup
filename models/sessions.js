const mongoose = require('mongoose');

let sessionSchema = new mongoose.Schema({
	sessionName: String,
	sessionPop: Number,
	locationID: Number,
	sessionDate: Date,
	sessionOwnerEmail: String,
	sessionAttendes: [],
	sessionDescription: [],
});
var sessionModel = mongoose.model('sessionModel', sessionSchema);

module.exports = mongoose.model("sessionModel")