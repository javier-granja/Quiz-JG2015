var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials =require('express-partials');
var methodOverride=require('method-override');
var session=require('express-session');


var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


// Helpers dinamicos:
app.use(function(req,res,next){
    //guardar el path en session.redir para despues de login
    if (!req.path.match(/\/login|\/logout/)) {
        req.session.redir=req.path;
    };//fin if
    // Hacer visible req.session en las vistas
    res.locals.session=req.session;
    next();
});//fin use

app.use(function(req,res,next){

       console.log(req.session);
       
       var t0=req.session.data;
       console.log(req.session.data)
       if (typeof req.session.data!=="undefined") {
        var tiempo0=(tiempo0||t0.data); 
        tiempo=Date.now();
        console.log(tiempo-tiempo0);
        if (tiempo-tiempo0>10000) {
            req.session.errors=[{"mensage":'Reiniciar sesión'}];
            var errors1 = new Array(req.session.errors);
            if (typeof errors1[0][0].mensage!=="undefined") {     
               var errors2 =new Array(errors1[0][0].mensage.toString());
           }
            console.log(errors1);
            //var errors3 =new Array(errors1[0][0].mensage.toString());
            delete req.session.user;
            delete req.session.date;
            res.render('sessions/new',{errors:[]}); 
        } else{tiempo0 =tiempo;};

       };//fin if typeof
  
       next();
    });


app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors:[]
    });
});


module.exports = app;
