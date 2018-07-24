var mongoose = require("mongoose"); 


var resourceSchema = new mongoose.Schema({
	name: String,
	sub: [{
	 	 type: mongoose.Schema.Types.ObjectId,
         ref: "Sub"
	 }]
	
});


module.exports = mongoose.model("Resource", resourceSchema);