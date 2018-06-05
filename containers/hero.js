var _ = require("underscore");
let _src = require("./src");
let _alt = require("./alt");

// Shared similarites between hero containers
module.exports = function(src, alt) {
    var value = { "hero": _.extend({}, _src(src), _alt(alt)) };
    return _.extend({}, value);
};
