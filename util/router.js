var express = require('express');
var _ = require("underscore");
var pick = require("../util/pick");

// Parse the values from the routes Object
var Parser = function(val, key, router) {
    try {
        if (_.isArray(val)) {
            var route = val[0], path = val[1];
            if (_.isFunction(route)) {
                return router.get('/', route);
            } else if (_.isObject(route)) {
                return router.get('/', function(req, res, next) {
                    res.render(pick(path, "templates/page"), route);
                });
            }
        } else if (_.isObject(val)) {
            return router.get('/', function(req, res, next) {
                res.render("templates/page", val);
            });
        }
    } catch (e) { throw e; }
};

// Converts the values from the routes to an Object full of routes `{ key: route }``
var ParseRoutes = function(list, key) {
    var router = express.Router();
    return function() {
        Parser(list[key], key, router);
        return router;
    };
};

module.exports = function(routers, route) {
    return ParseRoutes(routers, route)();
};
