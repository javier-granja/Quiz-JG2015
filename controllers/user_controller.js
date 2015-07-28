var users ={
			admin:{id:1, username:"admin", password:"1234"},
			pepe:{id:2, username:"pepe",  password:"5678"}
			};

//Comprueba que el usuario esta registrado en users
//si la autenticación falla o hay errores se ejecuta el callback(error)
exports.autenticar=function(login,password,callback){
	console.log(login+"  "+password);

	if (users[login]!==undefined) {
		if (password===users[login].password) {
			callback(null,users[login]);
		} else{console.log('Password erróneo.');
			callback(new Error('Password erróneo.'),{});};
	} else{console.log('No existe el usuario.');
		callback(new Error('No existe el usuario.'),{});};
};// fin autenticar