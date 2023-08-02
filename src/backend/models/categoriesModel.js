/* Definisco uno schema da andare poi ad inserire all'interno del Database per le categorie */

var mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	categoryName:  String, // String is shorthand for {type: String}
	description: String,
	imageUrl: String,
    created_date:{
        type: Date,
        default: Date.now
    }
});

//"users" è il nome della collection in mongoDB.
module.exports = mongoose.model('categories', categorySchema);