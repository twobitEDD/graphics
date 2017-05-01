var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var webglroute = require('./routes/webgl');
var canvasroute = require('./routes/canvas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/webgl/', webglroute);
app.use('/canvas/', canvasroute);

// catch 404 render lost page
app.use(function(req, res, next) {
  var messages = ["Are you f*king lost?", "Learn how to type", "This is not a real page, step back and rethink your life.", "Page not found"];
  var theMessage = messages[Math.floor(Math.random() * 3)];
  console.log(theMessage);
  res.render('lost', {message: theMessage });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
