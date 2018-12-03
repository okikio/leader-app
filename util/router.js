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
                    res.render(pick(path, "template/layout"), route);
                });
            }
        } else if (_.isObject(val)) {
            return router.get('/', function(req, res, next) {
                res.render("template/layout", val);
            });
        }
    } catch (e) { throw e; }
};

// Converts the values from the routes to an Object full of routes `{ key: route }``
var ParseRoutes = function(list) {
    return _.reduce(list, function(obj, val, key) {
        var router = express.Router();
        if (!_.isUndefined(val)) {
            obj[key] = function() {
                Parser(val, key, router);
                return router;
            };
        }
        return obj;
    }, {});
};

module.exports = function(routers, route) {
    return ParseRoutes(routers)[route]();
};

module.exports.ParseRoutes = ParseRoutes;
module.exports.Parser = Parser;
