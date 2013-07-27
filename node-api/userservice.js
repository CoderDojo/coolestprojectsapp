
/**
 * Module dependencies.
 */

var express = require('express')
, engines = require('consolidate');
  
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '',
  database : '',
  user     : '',
  password : '',
});

app.use(express.static(__dirname + '/public'));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

  
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/user/login', function(req, res){
  var username = req.query.username;
  var password = req.query.password;

  var obj = { result: true, message: "successful login" };
  res.jsonp(200,obj);
});

app.post('/user/register', function(req, res) {
	console.log("################ " + req.body.email);
    var email = req.body.email;
    var password = req.body.password;
    var coderdojo = req.body.coderdojo;
    var name = req.body.name;
    
    //validateEmail('email', email, res);
    var passedEmail = validateValue('email', email, res);
    var passedPassword = validateValue('password', password, res);
    var passedName = validateValue('name', name, res);

	if(passedEmail && passedPassword && passedName) {
    	connection.connect();
    
    	var query = connection.query('INSERT INTO USERS SET EMAIL=?, PASSWORD=?, NAME=?', [email, password, name], function(err, result) {
  			if (err) {
  				console.log(err);
  				var obj = { result: false, message: "registration failed" };
    			res.jsonp(500,obj);
  			} else {
  				var obj = { result: true, message: "successful register" };
    			res.jsonp(200,obj);
  			}
		});
		connection.end();
	}
});

function validateEmail(field, email, res) {
	if(email.indexOf("@") == -1  ||
		email.indexOf(".") == -1) {
		var obj = { result: false, message: "You need to enter a valid "+field+" value with @" };
    	res.jsonp(500,obj);
	}
}

function validateValue(field, value, res) {
	if(!value || 0 === value.length) {
		var obj = { result: false, message: "You need to enter a valid "+field+" value" };
    	res.jsonp(500,obj);
	}
}

app.listen(process.env.PORT || 3000) 
