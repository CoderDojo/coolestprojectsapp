
/**
 * Module dependencies.
 */

var express = require('express')
, engines = require('consolidate');
  
var app = express();

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
  //res.setHeader('Content-Type', 'text/plain');
  //res.end(username+ ' '+  password);
  
  var obj = { result: true, message: "successful login" };
  res.jsonp(200,obj);
});

app.get('/user/register', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.listen(process.env.PORT || 3000) 
