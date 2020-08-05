var mongoose = require('mongoose');
const Joi = require('@hapi/joi');
var quesSchema = mongoose.Schema({
    quest: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
    answer: String
});

var question = mongoose.model("question", quesSchema); 

function validateInput(data) {
    const schema = Joi.object({

        quest: Joi.string().min(3).required(),
        optionA: Joi.string().min(1).required(),
        optionB: Joi.string().min(1).required(),
        optionC: Joi.string().min(1).required(),
        optionD: Joi.string().min(1).required(),
        answer: Joi.string().min(1).required(),
    });
    return schema.validate(data,{abortEarly:false});
}


module.exports.question = question;
module.exports.validate = validateInput;
