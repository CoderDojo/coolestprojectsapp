var express = require('express');
var app = module.exports = express();

app.get('/user/login', function(req, res){
	res.jsonp(200)
})
app.get('/user/register', function(req, res){
	res.jsonp(200,{})
})