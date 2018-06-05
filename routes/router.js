var express = require('express');
var _ = require("underscore");

let pick = require("../util/pick");
let routers = require("./route")["routers"];

// Parse the values from the routes Object
let Parser = function(val, key, router) {
    if (_.isArray(val)) {
        let route = val[0], path = val[1];
        if (_.isFunction(route)) {
            return router.get('/' + pick(path, ""), route);
        }
        else if (_.isObject(route)) {
            return router.get('/', function(req, res, next) {
                res.render(pick(path, ""), route);
            });
        }
    } else if (_.isFunction(val)) {
        return router.get('/', val);
    } else if (_.isObject(val)) {
        return router.get('/', function(req, res, next) {
            res.render(key, val);
        });
    } else { throw new Error("Route is not formated properly."); }
};

// Converts the values from the routes to an Object full of routes `{ key: route }``
let ParseRoutes = function(list) {
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

module.exports = function(route) {
    return ParseRoutes(routers) [route] ();
};
