var models = require ('../models/models.js');
// Autoload - factoriza el código si la ruta incluye :quizId
exports.load=function(req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz=quiz;
				next();
			}else {next(new Error('No exixte quizId='+quizId));}	
	}//fin fuction(quiz)
	).catch (function(error){next(error);})
};


// GET /quizes
exports.index=function(req,res){
       console.log(req.query.search);
       if ((req.query.search===undefined)||(req.query.search==='')) {
       	    var texto  = "Texto&nbsp;a&nbsp;buscar";
          models.Quiz.findAll().then(function(quizes){
	       res.render('quizes/index.ejs',{quizes:quizes, texto:texto});	
	      }).catch (function(error){next(error);})

       } else{
           var cadena = req.query.search;
           var texto  = req.query.search; 
           cadena= cadena.replace(/\s+/g,"%");
           texto = texto.replace(/\s+/g,"&nbsp;");
           //console.log(texto);
           models.Quiz.findAll({where: ["pregunta like ?", '%' + cadena + '%']}).then(function(quizes){
	       res.render('quizes/index.ejs',{quizes:quizes, texto:texto});	
	      }).catch (function(error){next(error);})
       };	
};
// GET /quizes/:id
exports.show=function(req,res){
	  res.render('quizes/show',{quiz:req.quiz});	
};

//GET / quizes/answer
exports.answer=function(req,res){
	var resultado='Incorrecto';
	if (req.query.respuesta===req.quiz.respuesta) {
			resultado='Correcto';
		}//fin if 
			res.render('quizes/answer',{quiz: req.quiz, respuesta:resultado});	
};