const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
require('./db'); 

const route = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
route(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  // render the error page
  res.status(status).json({
    message : err.message,
    status: status
  });
});

module.exports = app;
