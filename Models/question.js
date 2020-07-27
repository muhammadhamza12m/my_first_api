var mongoose = require('mongoose');
const Joi = require('@hapi/joi');
var quesSchema = mongoose.Schema({
    name: String,
    course: String,
});

var ques = mongoose.model("question", quesSchema); 

function validate(data) {
    const schema = Joi.object({

        name: Joi.string().max(10).min(3).required(),
        course: Joi.string().max(10).min(1).required()
    });
    return schema.validate(data,{abortEarly:false});
}

module.exports.validate = validate;
module.exports = ques;