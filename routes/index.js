var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller.js');
var commentController=require('../controllers/comment_controller.js');
var sessionController=require('../controllers/sessionController.js');


//página de entrada (home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',errors:[]});
});
//página de créditos
router.get('/author', function(req, res) {
 res.render('autor',{errors:[]});
});
            
//Autoload de comandos con :quizId
router.param('quizId',                     quizController.load);//autoload:quizId
router.param('commentId',                  commentController.commentload);//autoload:commentId
//router.get('/quizes/:quizId(\\d+)/comments/new', function(req, res) {res.send('llego');});

// Definición de las rutas de session
router.get('/login',                 sessionController.newlogin);    //formulario login
router.post('/login',                sessionController.createlogin); //crear sesión
router.get('/logout',                sessionController.destroylogin); //destruir sesión


//Definición de rutas de /quizes
router.get('/quizes',                          quizController.index);
router.get('/quizes/:quizId(\\d+)',            quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',     quizController.answer);
router.get('/quizes/new',                      sessionController.loginRequired,quizController.new);
router.post('/quizes/create',                  sessionController.loginRequired,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',       sessionController.loginRequired,quizController.edit);
router.put('/quizes/:quizId(\\d+)',            sessionController.loginRequired,quizController.update);
router.delete('/quizes/:quizId(\\d+)',         sessionController.loginRequired,quizController.destroy);


// Definición de rutas de comentarios
router.get ('/quizes/:quizId(\\d+)/comments/new',commentController.commentnew);
router.post('/quizes/:quizId(\\d+)/comments'    ,commentController.commentcreate);
router.get ('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',commentController.commentpublish);

              
module.exports = router;
