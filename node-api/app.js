var express = require('express')
var app = express()
app.use(express.bodyParser());

// SEE: https://github.com/bu/Accessor_MySQL for DB instructions
var Accessor = require("Accessor")
db = {
	user: Accessor("users", "MySQL")
}

var user = require('./lib/user')
var responses = require('./lib/responses')

app.use(user)

app.listen(process.env.PORT || 3000)
console.log("Listening on port "+(process.env.PORT || 3000))