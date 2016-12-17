var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var tvshowSchema = new Schema({
	id_str: 		{ type: String },
	text: 		  { type: String }
});


module.exports = mongoose.model('small', tvshowSchema);  
