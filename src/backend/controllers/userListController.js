/* qua definisco i metodi che ho scelto di invocare nelle route per il backend */

var mongoose = require('mongoose');
const User = require('../models/userListModels.js');
const Category = require('../models/categoriesModel.js');
user = mongoose.model('users'); //Nome della collection in MongoDB per gli user.
categories = mongoose.model('categories'); //Nome della collection in MongoDB per le categories.

exports.list_all_users = async (req, res)=> {
	try{
		res.json(await user.find({}));
	}catch (err){
		res.json(err);
	}
};

exports.create_an_user = async (req, res)=> {
    const newUser = new User(req.body);
    try{
        res.json(await newUser.save());
    }catch (e) {
        res.json(e);
    }
};

exports.checkIfRegisterForLogin = async (req, res)=> {
	try {
        const { email , first_name } = req.body;
        const user = await User.findOne({ email, first_name});
    
        if (!user) {
          return res.status(404).json({ error: 'User not registered' });
        }
    
        //TODO Puoi aggiungere altri controlli qui, ad esempio confrontare anche la password.
    
        return res.status(200).json({ message: 'Login successful' });
      } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
      }
};

exports.create_a_category = async (req, res)=> {
  const newCategory = new Category(req.body);
  try{
      res.json(await newCategory.save());
  }catch (e) {
      res.json(e);
  }
};