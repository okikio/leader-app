var createError = require('http-errors');
var express = require('express');
var http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var _ = require("underscore");
var compress = require('compression');
var staticify = require('staticify')(path.join(__dirname, 'public'));

// List of routers 
var Router = require('./util/router');
var app = express();

// List of routes and routers
var routes = require("./render.min")["route"];
var routeList = routes["routes"];
var errors = routes["errors"];

app.locals = {
    getVersionedPath: staticify.getVersionedPath
};

// Compress/GZIP Server
app.use(compress());
app.use(staticify.middleware);
app.use(function(req, res, next) {
    req.url = req.url.replace(/\/([^\/]+)\.[0-9a-f]+\.(css|js|jpg|png|gif|svg)$/, '/$1.$2');
    next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '30 days' }));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set route to routers 
_.each(routeList, function(_router, route, obj) {
    app.use(route, Router(_router));
});

// Set route to routers (for errors)
_.each(errors, function(_router, route, obj) {
    // Catch error and forward to error handler
    app.use(function(req, res, next) {
        next(createError(Number(route)));
    });

    // Error handler
    app.use(function(err, req, res, next) {
        // Render the error page
        res.status(err.status || 500);
        res.render('error', _router);
    });
});

module.exports = app;
