var _ = require("underscore");
var layer = require("./layer");

// Shared similarites between content containers 
module.exports = function(/* ... layers, ... */) {
    var value = { 
        "content": {
            "layers": _.map(_.toArray(arguments), function (val) { 
                return typeof val == "object" ? val : layer(val); 
            }), 
        }
    };
    return _.extend({}, value);
};
