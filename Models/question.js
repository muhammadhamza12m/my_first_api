var mongoose = require('mongoose');
var quesSchema = mongoose.Schema({
    name: String,
    course: String,
});

var ques = mongoose.model("question", quesSchema); 
module.exports = ques;