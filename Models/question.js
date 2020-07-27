var mongoose = require('mongoose');
const Joi = require('@hapi/joi');
var quesSchema = mongoose.Schema({
    name: String,
    course: String,
});

var ques = mongoose.model("question", quesSchema); 

module.exports = ques;
