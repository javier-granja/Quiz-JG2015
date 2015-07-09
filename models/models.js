var path= require('path');
//postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQlite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name =(url[6]||null);
var user    =(url[2]||null);
var pwd     =(url[3]||null);
var protocol=(url[1]||null);
var dialect =(url[1]||null);
var port    =(url[5]||null);
var host    =(url[4]||null);
var storage =process.env.DATABASE_STORAGE;

console.log(url);

//Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQlite o postgres

var sequelize=new Sequelize(DB_name, user,pwd,
    { dialect:  protocol,
      protocol: protocol,
      port:     port,
      host:     host,
      storage:  storage, //solo SQLite (.env)
      omitNull: true     //solo Postgres
    }
  );

//Importar la definición de la tabla quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz=Quiz;// exportar la definición de la tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function() {
  Quiz.count().success(function(count){
    if (count===0) {
    // creamos la tabla si no esta creada.
    Quiz.create({
        pregunta: "Capital de Portugal",
        respuesta: "Lisboa"
                });
    Quiz.create({
        pregunta: "Capital de Italia",
        respuesta: "Roma"
    }).then(function() {
        // you can now access the newly created user via the variable user
        console.log('Base de datos inicializada');
    });
     }; //fin if	
  });  
});