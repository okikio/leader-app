var _ = require("underscore");
let _src = require("./src");
let _alt = require("./alt");
let _title = require("./title");

// Shared similarites between content containers 
module.exports = function(/* ... args, ... */) {
    return {
        "tile": _.extend.apply(null, [{}, _src(), _alt(), _title()].concat(
            _.map(_.toArray(arguments), function (val) {
                if (typeof val !== "object") return;
                return val;
            })
        ))
    };
};
