var _ = require("underscore");
var pick = require("../util/pick");

// Shared similarites between src containers
module.exports = function(src) {
    var value = { "src":  pick(src, "/images/icon/icon-512.png") };
    return _.extend({}, value);
};
