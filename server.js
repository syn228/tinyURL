var express = require('express');
var app = express();
var apiRouter = require('./routes/api');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var restRouter = require('./routes/rest');
var mongoose = require('mongoose');

mongoose.connect('mongodb://user:user@ds125060.mlab.com:25060/tinyurl');

app.longToShortHash = {};
app.shortToLongHash = {};

app.use('/public', express.static(__dirname + '/public'));

// deal with all the links should be sent to the backend
app.use('/api/v1', restRouter);

app.use('/', indexRouter);

// column means whatever comes after is a variable
app.use('/:shortUrl', redirectRouter);

app.listen(3000);
