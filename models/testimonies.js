var mongoose = require("mongoose"); 


var testSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	church: String
});


module.exports = mongoose.model("Testimonies", testSchema);