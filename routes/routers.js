var _ = require("underscore");
var page = require("../containers/page");
var title = require("../containers/title");
var tabs = require("../containers/tabs");
var tab_focus = require("../containers/tab-focus");
var hero = require("../containers/hero");
var content = require("../containers/content");
var layer = require("../containers/layer");
var details = require("../containers/details");
var src = require("../containers/src");
var alt = require("../containers/alt");
var tile = require("../containers/tile");
var img = require("../containers/img");
var css = require("../containers/css");
var js = require("../containers/js");

// List of routers
module.exports = {
    "index": page(title("Leaders")),
    "about": page(title("About"))
};
