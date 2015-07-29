var models = require ('../models/models.js');
//Autoload : commetIdid de comentarios
exports.commentload=function(req,res,next,commetId){
	models.Comment.find({where:{id: Number(commetId)}})
	.then(function(comment){
		if (comment) {
			req.comment=comment;
			next();
		} else{next(new Error ('No existe commetId'+commetId));}
	}//fin fuction(comment)
   ).catch(function(error){next(error);});
};
//GET / quizes/:quizID/comments/new
exports.commentnew=function(req,res){
	res.render('comments/new',{quizid:req.params.quizId,errors:[]});
};


//POST / :quizID/comments
exports.commentcreate=function(req,res){
	  //console.log(req.body.comment.texto);
	  //console.log(req.params.quizId);//
var comment=models.Comment.build( //crea el objeto Comment con la estructura de al base de datos
	   {texto:req.body.comment.texto, QuizId:req.params.quizId}
		);	
var validate_errors = comment.validate();
    // console.log(validate_errors);

if (validate_errors) {	
	var errors = new Array(validate_errors.texto); 
       if (validate_errors.texto ===undefined) {errors.splice(0,1);};
     res.render('comments/new',{quizid:req.params.quizId,errors:errors});
      return;
      } 
//Guardar en DB los campos de pregúnta y respuesta de quiz
comment.save ({fields:["texto","QuizId","publicado"]}).then(function(){
	  	res.redirect('/quizes/'+req.params.quizId);
	  })// Redirección HTTP (URL relativo) lista de pregúntas.

};//fin function

exports.commentpublish=function(req,res){
	req.comment.publicado=true;
	req.comment.save({fields:["publicado"]})
	.then(function(){res.redirect('/quizes/'+req.params.quizId);})
	.catch(function(error){next(error)});
};
