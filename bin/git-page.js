#!/usr/bin/env node

var fs = require("fs");
var path = require('path');
var pug = require('pug');
var _ = require("underscore");

// List of routes and routers
var routes = require("./data/render.min");
var routeList = routes["routes"];
var routers = routes["routers"];
var error = routes["error"];
var root = path.normalize(__dirname + '/../');

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
                
