var mongoose = require("mongoose");

var customerSchema = new mongoose.Schema({
	fname: String,
	lname: String,
	dob: String,
	phone: String,
	address: String,
	favbike: String
})

var Customer = mongoose.model("Customer",customerSchema);
module.exports = Customer;