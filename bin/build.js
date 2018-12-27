#!/usr/bin/env node
var shell = require("shelljs");
shell.exec("compile");
shell.exec("gulp");
shell.exec("cache");
shell.exec("gulp");