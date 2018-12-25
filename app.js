var createError = require('http-errors');
var express = require('express');
var http = require("http");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var _ = require("underscore");
var compress = require('compression');
var fs = require("fs");
var staticify = require('staticify')(path.join(__dirname, 'public'));

// List of routers 
var Router = require('./util/router');
var app = express();

// List of routes and routers
var routes = require("./data/render.min");
var routeList = routes["routes"];
var routers = routes["routers"];
var error = routes["error"];

// Caching
// _cache();

app.locals = {
    getVersionedPath: staticify.getVersionedPath
};

// Compress/GZIP Server
app.use(compress());
app.use(staticify.middleware);
app.use(function(req, res, next) {
    req.url = req.url.replace(/\/([^\/]+)\.[0-9a-f]+\.(css|js|jpg|png|gif|svg|cache)$/, '/$1.$2');
    next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '30 days' }));
app.get("/app.cache", function(req, res) {
    res.header("Content-Type", "text/cache-manifest");
    res.end("CACHE MANIFEST");
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set route to routers 
_.each(routeList, function(route, path, obj) {
    if (_.isFunction(routers[route])) {
        routers[route](app.route(route));
    } else {
        app.use(path, Router(routers, route));
    }
});

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

function _cache() {
    var filesToCache = [
            '/',
            '/fonts/fonts.min.css'
        ]
        .concat(
            map_cache("/images"),
            map_cache("/js"),
            map_cache("/css")
            //, map_cache("/fonts")
            );

    function map_cache(path) {
        var _path = __dirname + "/public" + (path + "");
        const filesNames = fileList(_path, path + "/");
        return filesNames
    }

    function fileList(dir, _path) {
        let path_ = _path || "";
        return fs.readdirSync(dir).reduce(function(list, file) {
            var name = path.join(dir, file);
            var isDir = fs.statSync(name).isDirectory();
            return list.concat(isDir ? fileList(name, _path + file + "/") : [_path + file]);
        }, []);
    }

    var begin = ['CACHE MANIFEST', '#v0.0.2 change this to force update\n', '# Cache', 'CACHE:\n'].join("\n");
    var end = ['\n\nNETWORK:', '*\n', 'FALLBACK:', '/ /'].join("\n");
    fs.writeFile(__dirname + '/public/app.cache', (begin + filesToCache.join('\n') + end), function(err) {
        if (err) { throw err; }
    });

    fs.writeFile(__dirname + '/client/js/cachelist.js', "var filesToCache = " + JSON.stringify(filesToCache) + ";", function(err) {
        if (err) { throw err; }
    });
}

module.exports = app;
