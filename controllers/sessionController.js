var userController= require ('./user_controller.js');

//MW de autorizació de accesos HTTP restringidos
exports.loginRequired=function(req,res,next){
     if (req.session.user) {
          next();
     } else{
        res.redirect('/login');  
     };
};

//GET / login --Formulario de login
exports.newlogin=function(req,res){
	//var errors=req.session.errors||{};

     console.log(req.session.errors);
     if (typeof req.session.errors!=="undefined") {
          var errors1 = new Array(req.session.errors);

          if (typeof errors1[0][0].mensage!=="undefined") {     
               var errors2 =new Array(errors1[0][0].mensage.toString());
                              
               if (errors2[0]==='inicio') {errors2=[];};

          console.log(errors2[0]);
          };//fi if (errors[0][0].mensage)
          
          

     } else{var errors2=[];};
	req.session.errors=[{"mensage":'inicio'}];
     
     //console.log(errors[0][0].mensage);

	res.render('sessions/new',{errors:errors2});
};


//POST /login  --Crear sesión
exports.createlogin=function(req,res){
     var login   =req.body.login;
     var password=req.body.password;
     userController.autenticar(login,password,function(error,user){
     	

          if (error!==null) {// si hay error devolvemos mensajes de error de sesión		
               req.session.errors=[{"mensage":'Se ha producido un error:  '+error}];
               res.redirect('/login');
     		return;
     	};//fin if
     // Crear req.session.user y guardar campos id y username
     // La sesión se define or la existencia de req.session.user
     req.session.user = {id:user.id, username:user.username};
     console.log(user);
     res.redirect(req.session.redir.toString());
     // redirección al path anterior a login
     });// fin autenticar
};//fin function

//DELETE /logout  --Destruir sesión
exports.destroylogin=function(req,res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
	// redirección al path anterior a login
};// fin destroylogin

