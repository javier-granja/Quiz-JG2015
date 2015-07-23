var models = require ('../models/models.js');
// Autoload - factoriza el código si la ruta incluye :quizId
exports.load=function(req,res,next,quizId){
	models.Quiz.find({
		where:{id: Number(quizId)},
		include:[{model:models.Comment}]
	}).then(	function(quiz){
			if (quiz) {
				req.quiz=quiz;
				next();
			}else {next(new Error('No exixte quizId='+quizId));}	
	}//fin fuction(quiz)
	).catch (function(error){next(error);})
};
// GET /quizes
exports.index=function(req,res){
      // console.log(req.query.search);
       if ((req.query.search===undefined)||(req.query.search==='')) {
       	    var texto  = "Texto&nbsp;a&nbsp;buscar";
          models.Quiz.findAll().then(function(quizes){
	       res.render('quizes/index.ejs',{quizes:quizes, texto:texto,errors:[]});	
	      }).catch (function(error){next(error);})

       } else{
           var cadena = req.query.search;
           var texto  = req.query.search; 
           cadena= cadena.replace(/\s+/g,"%");
           texto = texto.replace(/\s+/g,"&nbsp;");
           //console.log(texto);
           models.Quiz.findAll({where: ["pregunta like ?", '%' + cadena + '%']}).then(function(quizes){
	       res.render('quizes/index.ejs',{quizes:quizes, texto:texto,errors:[]});	
	      }).catch (function(error){next(error);})
       };	
};
// GET /quizes/:id
exports.show=function(req,res){
	  res.render('quizes/show',{quiz:req.quiz,errors:[]});	
};

//GET / quizes/answer
exports.answer=function(req,res){
	var resultado='Incorrecto';
	if (req.query.respuesta===req.quiz.respuesta) {
			resultado='Correcto';
		}//fin if 
			res.render('quizes/answer',{quiz: req.quiz, respuesta:resultado,errors:[]});	
};
//GET / quizes/new
exports.new=function(req,res){
	var quiz=models.Quiz.build( //crea el objeto quiz con la estructura de al base de datos
	   {pregunta:"Pregunta", respuesta:"Respuesta",tema:"Otro"}
		);	
		res.render('quizes/new',{quiz: quiz,errors:[]});	
};
//POST / quizes/create
exports.create=function(req,res){
	var quiz=models.Quiz.build(req.body.quiz);
     //console.log( req.body.quiz);
     var validate_errors = quiz.validate();
    
     if (validate_errors) {	
       //console.log( validate_errors);   
       var errors = new Array(validate_errors.pregunta, validate_errors.respuesta,validate_errors.tema);
       if (validate_errors.tema     ===undefined) {errors.splice(2,1);}; 
       if (validate_errors.respuesta===undefined) {errors.splice(1,1);}; 
       if (validate_errors.pregunta ===undefined) {errors.splice(0,1);};
       console.log(errors); 
       res.render('quizes/new',{quiz: quiz,errors:errors});
      return;
      } 

	//Guardar en DB los campos de pregúnta y respuesta de quiz
	  quiz.save ({fields:["pregunta","respuesta","tema"]}).then(function(){
	  	res.redirect('/quizes');
	  })// Redirección HTTP (URL relativo) lista de pregúntas.
};
// GET /quizes/:id/edit
exports.edit=function(req,res){
	  var quiz=req.quiz;//autoload de la instancia de quiz
	  res.render('quizes/edit',{quiz:quiz,errors:[]});	
};
//PUT /quizes/:id
exports.update=function(req,res){
	
	//var quiz=models.Quiz.build(req.body.quiz);
	req.quiz.pregunta=req.body.quiz.pregunta;
	req.quiz.respuesta=req.body.quiz.respuesta;

     var validate_errors = req.quiz.validate();
    
     if (validate_errors) {	
       //console.log( validate_errors);   
       var errors = new Array(validate_errors.pregunta, validate_errors.respuesta,validate_errors.tema);
       if (validate_errors.tema     ===undefined) {errors.splice(2,1);}; 
       if (validate_errors.respuesta===undefined) {errors.splice(1,1);}; 
       if (validate_errors.pregunta ===undefined) {errors.splice(0,1);};
       res.render('quizes/edit',{quiz: req.quiz,errors:errors});
      return;
      } 

	//Guardar en DB los campos de pregúnta y respuesta de quiz
	  req.quiz.save ({fields:["pregunta","respuesta","tema"]}).then(function(){
	  	res.redirect('/quizes');
	  })// Redirección HTTP (URL relativo) lista de pregúntas.
};

//DELETE/quizes/:id
exports.destroy=function(req,res){
      req.quiz
      .destroy()
	  .then(function(){
	  	res.redirect('/quizes');// Redirección
	  }).catch(function(error){next(error)})
	  
};

