var express = require('express');
var app = module.exports = express();

app.post('/user/login', function(req, res){
	var options = {
		where: [
			["email", "=", req.body.email]
		],
		fields: ["name","email","coderdojo","session_hash"]
	}
	db.user.select(options, function(err,data,fields){
		if(err){ throw err; }
		res.send(data)
	})
})
app.get('/user/register', function(req, res){
	res.jsonp(200,{})
})