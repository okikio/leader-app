#!/usr/bin/env node

var fs = require("fs");
var path = require('path');
var util = require('util');
var _ = require("underscore");
var colors = require("colors");

// Stringify
let stringify = function(obj) {
    var fns = [],
        json = JSON.stringify(obj, function(key, val) {
            if (_.isFunction(val)) {
                fns.push(val.toString());
                return "_";
            }
            return val;
        }, 4);

    return json.replace(/\"_\"/g,
        function($) { return fns.shift(); });
};

// Compile all components for routers into runnable js
let render = function(from, to) {
    let content = {}, root = path.normalize(__dirname + '/../');
    // Read all the files from the 'from' directory
    fs.readdir(root + from, function(err, filenames) {
        if (err) { throw err; }
        // Iterate per file
        filenames.forEach(function(dir) {
            var file = require(root + from + dir);
            var __dir = dir.replace(".js", "");
            content[__dir] = {};
            for (var i in file) content[__dir][i] = file[i];

            // Write the contents of each component to it's compiled counter-part 
            fs.writeFile(root + to + '.js', "module.exports = " + stringify(content) + ";", function(err) {
                if (err) { throw err; }
            });
            console.log((from + dir).red + ' - Read operation complete.');
        });
    });
};

// Folders
render('routes/', 'data/render');
