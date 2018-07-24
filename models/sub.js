var mongoose = require("mongoose"); 


var subSchema = new mongoose.Schema({
	name: String,
    description: String
    
});


module.exports = mongoose.model("Sub", subSchema);