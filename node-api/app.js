var express = require('express')
var app = express()

var user = require('./lib/user')
var responses = require('./lib/responses')

app.use(user)

app.listen(process.env.PORT || 3000)
console.log("Listening on port "+(process.env.PORT || 3000))