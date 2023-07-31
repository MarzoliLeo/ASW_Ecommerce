/* qua definisco i metodi che ho scelto di invocare nelle route per il backend */

var mongoose = require('mongoose'),
user = mongoose.model('Users');

exports.list_all_users = function (req, res) {
    user.find({}, function(err, user){
        if(err)
            res.send("Error of type" + err);
        res.json(user);
    });
};

exports.create_an_user = function (req, res) {
    var new_user = new user(req.body);
    new_user.save(function(err,user){
        if(err)
            res.send("Error of type" + err);
        res.json(user);
    });
};

exports.read_an_user = function (req, res) {
    user.findById(req.params.userId, function(err, user){
        if(err)
            res.send(err);
        res.json(user);
    });
};