var _ = require("underscore");
var _src = require("./src");
var _alt = require("./alt");

// Shared similarites between hero containers
module.exports = function(src, alt) {
    var value = { "hero": _.extend({}, _src(src), _alt(alt)) };
    return _.extend({}, value);
};
