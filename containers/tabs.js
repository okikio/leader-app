var _ = require("underscore");

// Shared similarites between tab containers
module.exports = function() {
    var args = _.toArray(arguments);
    return {
        "tabs": args[0] != 0 && args.length == 0 ? ["Intro", "Technical", "Psychology", "Social", "Personal", "Education", "Conclusion", "Works-Cited"] : args
    };
};
