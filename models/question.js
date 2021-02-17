var mongoose = require("mongoose");

var multiple_choice_options = new mongoose.Schema({
    option_name: String,
    value:{type: Number,select:false},
});

var questionSchema = new mongoose.Schema({
 question_name:String,
 multiple_choice_options:[multiple_choice_options],
 date_time:{ type: Date, default: Date.now},
});

module.exports =mongoose.model('questions', questionSchema)