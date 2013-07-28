var express = require('express')
var app = express()

var user = require('./lib/user')

app.use(user)

app.listen(process.env.PORT || 3000)