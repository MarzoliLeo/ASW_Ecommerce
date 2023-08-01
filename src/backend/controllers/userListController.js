/* qua definisco i metodi che ho scelto di invocare nelle route per il backend */

var mongoose = require('mongoose');
const User = require('../models/userListModels.js');
user = mongoose.model('users'); //Nome della collection in MongoDB.

exports.list_all_users = async (req, res)=> {
	try{
		res.json(await user.find({}));
	}catch (err){
		res.json(err);
	}
};

exports.create_an_user = async (req, res)=> {
    const newUser = new User(req.body); //TODO HAI MODIFICATO QUESTO, dovrebbe essere user con la u piccola.
    try{
        res.json(await newUser.save());
    }catch (e) {
        res.json(e);
    }
};

/*exports.read_an_user = async (req, res)=> {
	/*
	TODO cast req.params.id to ObjectId
	
	try{

		res.json(await movieModel.findById(req.params.id));
	}catch (e) {
		res.json(e);
	}
    /* questo usa callback che non sono più supportate.
    user.findById(req.params.userId, function(err, user){
        if(err)
            res.send(err);
        res.json(user);
    });
};*/