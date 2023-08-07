/* Definisco uno schema da andare poi ad inserire all'interno del Database per le categorie */

var mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
	coursesName:  String, // String is shorthand for {type: String}
	description: String,
	price: Number,
    courseCategory: String,
    // creatorOfCourse: String,
    created_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('courses', coursesSchema);