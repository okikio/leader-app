#!/usr/bin/env node

var fs = require("fs");
var shell = require("shelljs");
var path = require("path");
var watch = require("node-watch");
var colors = require("colors");
require('log-timestamp');

const watchFile = ["routes/", "containers/", "client/"];
const watchFileColor = watchFile.reduce(function(acc, cur, i) {
    return acc + cur.yellow + (i < watchFile.length - 1 ? ('\"'.yellow + ', ' + '\"'.yellow) : "\"".yellow);
}, "\"".yellow);
console.log('Watching'.red + ' for file changes on ' + watchFileColor);
watch(watchFile, { recursive: true }, function(evt, name) {
    console.log('%s'.cyan + ' got ' + evt + 'd', name); // Update + "d"
    if (evt != "delete") { 
        shell.exec("compile");
        shell.exec("gulp js"); 
        shell.exec("gulp css"); 
        shell.exec("gulp render"); 
    }
});
