var _ = require("underscore");
let pick = require("../util/pick");

// Shared similarites between details containers
module.exports = function(details) {
    var value = { "details": pick(details, "Details") };
    return _.extend({}, value);
};
