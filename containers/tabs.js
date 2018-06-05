var _ = require("underscore");

// Shared similarites between tab containers
module.exports = function(/* ... args, ... */) { 
    let args = _.toArray(arguments);
    return { 
        "tabs": args.length == 0 ? ["About", "Health Policies & Tech", "Connections", "References"] : args
    }; 
};
