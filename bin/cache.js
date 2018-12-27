#!/usr/bin/env node

var fs = require("fs");
var path = require('path');
var util = require('util');
var colors = require("colors");
var argv = Array.from(process.argv);

if (["--help", "-h"].indexOf(argv[2]) > -1) {
    console.log("Usage: cache " + "<command>".red + " \n\
cache " + "[--help] [-h]".red + "       Quick help \n\
cache " + "[-l] [-ls] [--list]".red + " Display full info when caching");
}

function _cache() {
    console.log("Starting!!!".green)
    var root = path.normalize(__dirname + '/../');
    var filesToCache = [
            '/',
            '/404'
        ]
        .concat(
            map_cache(""),
            map_cache("/images"),
            map_cache("/js"),
            map_cache("/css")
            , map_cache("/fonts")
            );

    function map_cache(path) {
        var _path = root + "/public" + (path + "");
        const filesNames = fileList(_path, path + "/");
        return filesNames;
    }

    function fileList(dir, _path) {
        return fs.readdirSync(dir).reduce(function(list, file) {
            var name = path.join(dir, file);
            var isDir = fs.statSync(name).isDirectory();
            var result = list.concat(isDir ? fileList(name, _path + file + "/") : [_path + file]);
            if (["--list", "-ls", "-l"].indexOf(argv[2]) > -1) {
                console.log(result.join("\n").red);
            }
            return result;
        }, []);
    }
    
    console.log("Writing!!!".cyan);
    console.log("App Cache Set!!!".magenta);

    var begin = ['CACHE MANIFEST', '#v0.0.1 change this to force update\n', '# Cache', 'CACHE:\n'].join("\n");
    var end = ['\n\nNETWORK:', '*\n', 'FALLBACK:', '/ /'].join("\n");
    fs.writeFile(root + '/public/app.cache', (begin + filesToCache.join('\n') + end), function(err) {
        if (err) { throw err; }
    });
    

    fs.writeFile(root + '/client/js/cachelist.js', "// V1 \nvar filesToCache = " + JSON.stringify(filesToCache) + ";\n", function(err) {
        if (err) { throw err; }
    });
    
    console.log("Worker Cache List Set!!!".magenta);
    console.log("Done, That Was Easy!!!".red);
}
_cache();