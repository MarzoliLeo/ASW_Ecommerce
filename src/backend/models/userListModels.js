/* Definisco uno schema da andare poi ad inserire all'interno del Database */

var mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
	first_name:  String, // String is shorthand for {type: String}
	last_name: String,
	email: String,
    created_date:{
        type: Date,
        default: Date.now
    }
});

//"users" è il nome della collection in mongoDB.
module.exports = mongoose.model('users',usersSchema);