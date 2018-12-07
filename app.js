var createError = require('http-errors');
var express = require('express');
var http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var _ = require("underscore");
var compress = require('compression');
var fs = require("fs");

// List of routers 
var Router = require('./util/router');
var app = express();

// List of routes and routers
var routes = require("./data/render.min");
var routeList = routes["routes"];
var routers = routes["routers"];
var error = routes["error"];

// Compress/GZIP Server
app.use(compress());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '30 days' }));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('view cache', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set route to routers 
/*
_.each(routeList, function(route, path, obj) {
    if (_.isFunction(routers[route])) {
        routers[route](app.route(route));
    } else {
        app.use(path, Router(routers, route));
    }
});*/
var url = require("url")
app.get("/", function (req, res) {
    res.redirect(url.format({
        pathname: "https://s.codepen.io/whitelightG/debug/XyGpbq/XxMVwaeLWRWr"
    }));
})

// 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Render the error page
    res.status(err.status || 500);
    res.render('template/error', error);
});


module.exports = app;
