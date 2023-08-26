/* Definisco uno schema da andare poi ad inserire all'interno del Database per le categorie */

var mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
	coursesName: String,
	description: String,
	price: Number,
    courseCategory: String,
    courseCreator: String,
    comments: {
        type: Array,
        required: true,
    },
    likes: {
        type: Array,
        required: true,
    },
    dislikes: {
        type: Array,
        required: true,
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('courses', coursesSchema);