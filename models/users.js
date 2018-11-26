const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	userEmail: String,
	userName: String,
	homeCourtlocationID: Number
});

var userModel = mongoose.model('userModel', userSchema);

module.exports = mongoose.model("userModel")