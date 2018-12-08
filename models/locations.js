const mongoose = require('mongoose');

let locationSchema = new mongoose.Schema({
	locationName: String,
	locationImage: String,
	locationAddress: String, 
	locationID: Number,
	indoorFlag: Boolean
});

var locationModel = mongoose.model('locationModel', locationSchema);

module.exports = mongoose.model("locationModel")