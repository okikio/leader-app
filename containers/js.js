var _ = require("underscore");

// Shared similarites between js containers
module.exports = function(/* ... js, ... */) {
    var value = { "js": _.toArray(arguments) };
    return _.extend({}, value);
};
