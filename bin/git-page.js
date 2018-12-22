#!/usr/bin/env node

var fs = require("fs");
var path = require('path');
var copydir = require('copy-dir');
var pug = require('pug');
var _ = require("underscore");

// List of routes and routers
var routes = require("../data/render.min");
var routeList = routes["routes"];
var routers = routes["routers"];
var error = routes["error"];
var root = path.normalize(__dirname + '/../');

fs.readdirSync(root, function (err, files) {
    var $dir = fs.lstatSync(root + "/" + files).isDirectory();
    if (err) return err;
    if ($dir && ["public"].indexOf(files) > -1) {
        copydir('/a/b/c', '/a/b/e', function(stat, filepath, filename){
          //...
        }, function(err) {
          //...
        });
    }

})

// Set route to routers 
_.each(routeList, function(route, path, obj) {
    if (!_.isFunction(routers[route]) && !_.isUndefined(route)) {
        _.reduce(routers, function(obj, val, key) {
            if (!_.isUndefined(val)) {
                obj[key] = function() {
                    fs.writeFileSync(root + "/git-page/" + route + ".html", pug.renderFile("views/template/layout.pug", val));
                };
            }
            return obj;
        }, {})[route]();
    }
});

fs.writeFileSync(root + "/git-page/404.html", pug.renderFile("views/template/error.pug", error));
                
