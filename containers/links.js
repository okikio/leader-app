var _ = require("underscore");
var pick = require("../util/pick");

// Shared similarites between src containers
module.exports = function(src) {
    var value = { "links":  pick(src, " ") };
    return _.extend({}, value);
};