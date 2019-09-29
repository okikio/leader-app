var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var compress = require('compression');
var express = require('express');
var logger = require('morgan');
var _ = require("underscore");
var path = require('path');
var Router = require('./util/router');
var app = express();
var routes = require("./data/render.min");
var routeList = routes.routes;
var routers = routes.routers;
var error = routes.error; app.use(compress());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '2592000' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', !0);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: !1 }));
app.use(cookieParser());
_.each(routeList, function(route, path, obj) {
    app.use(path, Router(routers, route));
});
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('templates/error', error);
});

module.exports = app;
