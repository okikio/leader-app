var _ = require("underscore");
let title = require("./title");
let tabs = require("./tabs");
let tab_focus = require("./tab-focus");
let footbar = require("./footbar");
let hero = require("./hero");
let content = require("./content");
let css = require("./css");
let js = require("./js");

// Shared similarites between page containers
module.exports = function(/* ...args */) {
    let defaults = _.extend({}, title(), tabs(), tab_focus(), footbar(), hero(), content(), css(), js());
    let containers = _.extend.apply(null, 
        [{}].concat(_.toArray(arguments)) 
    );
    
    return _.extend({}, defaults, containers);
};
