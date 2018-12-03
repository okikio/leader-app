var _ = require("underscore");

// Shared similarites between tab containers
module.exports = function() { 
    var args = _.toArray(arguments);
    return { 
        "tabs": args.length == 0 ? ["About", "Contact"] : args
    }; 
};
