var express = require('express');
var router = express.Router();

var quizController=require('../controllers/quiz_controller');
//página de entrada (home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz'});
});
//página de créditos
router.get('/author', function(req, res) {
 res.render('autor');
});
//Autoload de comandos con :quizId
router.param('quizId',                     quizController.load);//autoload:quizId

//Definicion de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
