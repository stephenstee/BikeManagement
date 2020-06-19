var mongoose = require("mongoose");

var bikeSchema = new mongoose.Schema({
	brand: String,
	image: String,
	model: String,
	Engine: String,
	cost: String,
	gear: String,
	category: String
})

var Bike = mongoose.model("Bike", bikeSchema);
module.exports= Bike;