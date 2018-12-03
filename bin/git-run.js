#!/usr/bin/env node
var shell = require("shelljs");
var argv = Array.from(process.argv);

shell.exec("git add -A");
shell.exec("git commit -m '" + (argv[2] || "Update") + '\'');
shell.exec("git push origin master");
shell.exec("git push heroku master");