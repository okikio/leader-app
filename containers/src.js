var _ = require("underscore");
var pick = require("../util/pick");

// Shared similarites between src containers
module.exports = function(src) {
    var value = { "src":  pick(src, "/images/city.jpg") };
    return _.extend({}, value);
};
