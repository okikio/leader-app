var createError = require('http-errors');
var express = require('express');
var http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var _ = require("underscore");
var compress = require('compression');

// List of routers 
var Router = require('./routes/router');
var app = express();

// Containers 
let page = require("./containers/page");
let title = require("./containers/title");
let css = require("./containers/css");
let footbar = require("./containers/footbar");
let details = require("./containers/details");

// List of routes and routers
let routes = require("./routes/route");
let routeList = routes ["routes"];
let errors = routes ["errors"];

// Use http/https as necessary
http.globalAgent.maxSockets = 50;

// Compress/GZIP Server
app.use(compress()); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set route to routers 
_.each(routeList, function(_router, route, obj) {
    // Catch error codes
    if (route.charAt(0) == "$") { 
        let errNum = Number(route.replace("$", ""));
        // Catch error and forward to error handler
        app.use(function(req, res, next) {
            next(createError(errNum));
            console.log(errNum + " Error Number")
        });

        // Error handler
        app.use(function(err, req, res, next) {
            // Render the error page
            res.status(err.status || 500);
            res.render('error', page(title(route.title || "Page not Found"), { home: true }, footbar(false), css("./css/error.css")));
        });
    } else { app.use(route, Router(_router)); }
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
        res.render('error', page.apply({}, [title("Error"), { hotword: "Oops!" }, details("There was a " + (err.status || 500) + " error."), footbar(false), css("./css/error.min.css")].concat(_router)));
    });
});

module.exports = app;
