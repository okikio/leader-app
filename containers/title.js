var _ = require("underscore");
var pick = require("../util/pick");

// Shared similarites between title
module.exports = function(title) {
    var value = { "title": pick(title, "Page") };
    return _.extend({}, value);
};
