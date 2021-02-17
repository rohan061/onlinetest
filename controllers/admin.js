const mongoose = require('mongoose');
const Question = require('../models/question');
const cors = require('cors');

module.exports.controller = function(app) {

app.post('/insertquestion',cors(), function(req, res) {	
var post = new Question({question_name:req.body.question.question_name,multiple_choice_options:req.body.question.multiple_choice_options});
post.save(function (err,results) {
		
		if (err){ 
        console.log(err) 
    }else{ 
	    
        console.log("Question Saved"); 
		res.status(200).send({ status: 1 }); 
    } 
		});


	
 });
 
 app.get('/getquestion',cors(), function(req, res) {	 
 var name =req.param('search');
 const pageOptions = {
    page: parseInt(req.param('page'), 10) || 0,
    limit: parseInt(req.param('limit'), 10) || 10
}

Question.find({'$or':[{question_name:{ $regex: '.*' + name + '.*',$options:'i' }},{mtid:{ $regex: '.*' + name + '.*',$options:'i' }}]}).exec(function(err, allquestion) {

 Question.find({'$or':[{question_name:{ $regex: '.*' + name + '.*',$options:'i' }},{mtid:{ $regex: '.*' + name + '.*',$options:'i' }}]})
    .sort([['date_time', -1]])
    .skip(pageOptions.page)
    .limit(pageOptions.limit)
    .exec(function (err, searchresult) {
        if(err) { res.status(500).json(err); return; };
        res.status(200).json({allcount:allquestion.length,searchresult:searchresult});
    });

});
 
 
 });
  
 
}