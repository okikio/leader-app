var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var _ = require("underscore");
var page = require("./util/page");

// List of routers 
var Router = require('./routes/router');
var app = express();

// List of routes and routers
let routeList = require("./routes/route") ["routes"];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set route to routers 
_.each(routeList, function(_router, route, obj) {
    app.use(route, Router(_router));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404', page({ "title": "Page not Found", "css": ["./css/404.css"], "footbar": false, }));
});

// catch 502 and forward to error handler
app.use(function(req, res, next) {
    next(createError(502));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('502', page({ "title": "Bad gateway", "css": ["./css/404.css"], "footbar": false, }));
});

module.exports = app;
