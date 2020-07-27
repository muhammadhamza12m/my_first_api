var mongoose = require('mongoose');
const Joi = require('@hapi/joi');
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password : String,
});

var user = mongoose.model("user", userSchema); 

function validateInput(data) {
    const schema = Joi.object({

        name: Joi.string().max(10).min(3).required(),
        email: Joi.string().max(10).min(1).required(),
        password: Joi.string().max(10).min(1).required()
    });
    
    return schema.validate(data,{abortEarly:false});
}

function validateInputLogin(data) {
    const schema = Joi.object({

      email: Joi.string().max(10).min(1).required(),
        password: Joi.string().max(10).min(1).required()
    });

    return schema.validate(data,{abortEarly:false});
}


module.exports.user = user;
module.exports.validate = validateInput;
module.exports.validate = validateInputLogin;
