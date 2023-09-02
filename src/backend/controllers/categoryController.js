//Controller with methods referring to categories

var mongoose = require('mongoose');
const Category = require('../models/categoriesModel.js');
categories = mongoose.model('categories'); //Nome della collection in MongoDB per le categories.


//Methods to create and manipulate categories

exports.create_a_category = async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        res.json(await newCategory.save());
    } catch (e) {
        res.json(e);
    }
};

exports.delete_category = async (req, res) => {
    const categoryName = req.body["categoryName"];
    try {
        await courses.deleteMany({ courseCategory: categoryName });
        res.json(await categories.deleteOne({ categoryName: categoryName }));

    } catch (err) {
        res.json(err);
    }
};



//Methods that list categories in different ways

exports.list_all_categories = async (req, res) => {
    try {
        res.json(await categories.find({}));
    } catch (err) {
        res.json(err);
    }
};