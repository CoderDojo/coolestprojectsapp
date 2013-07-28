
/**
 * Module dependencies.
 */

var express = require('express')
, engines = require('consolidate');
  
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env['DB_HOST'],
  database : process.env['DB_NAME'],
  user     : process.env['DB_USERNAME'],
  password : process.env['DB_PASSWORD'],
});

app.use(express.static(__dirname + '/public'));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger(process.env['EXPRESS_LOG']));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env['COOKIE_SECRET']));
app.use(express.session());
app.use(app.router);

  
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/user/login', function(req, res){
  var username = req.query.username;
  var password = req.query.password;

  console.log("######### "+process.env['MYNAME']);

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

	var hashPassword = hash(password);

	if(passedEmail && passedPassword && passedName) {
    	connection.connect();
    	var query = connection.query('INSERT INTO USERS SET EMAIL=?, PASSWORD=?, NAME=?', [email, hashPassword, name], function(err, result) {
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
	return true;
}

function hash(value) {
	console.log("hash " + value);
	var crypto = require('crypto');
	var hash = crypto.createHash('md5').update(value).digest("hex");
	console.log("returned-hash " + hash);
	return hash;
}

function hashSessionKey(emailAddr) {
	var curTime = new Date().getTime();
	var random =  Math.random(); 
	hash(curTime+random+emailAddr);
}

app.listen(process.env.PORT || 3000) 
