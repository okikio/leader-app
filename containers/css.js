var _ = require("underscore");

// Shared similarites between css containers
module.exports = function(/* ... css, ... */) {
    var value = { "css": _.toArray(arguments) };
    return _.extend({}, value);
};
