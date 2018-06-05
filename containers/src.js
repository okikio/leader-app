var _ = require("underscore");
let pick = require("../util/pick");

// Shared similarites between src containers
module.exports = function(src) {
    var value = { "src":  pick(src, "/assets/images/city.jpg") };
    return _.extend({}, value);
};
