var _ = require("underscore");

// Shared similarites between tab containers
module.exports = function() {
    var args = _.toArray(arguments);
    return {
        "tabs": args.length == 0 && args[0] != 0 ? ["Intro", "Technical", "Psychology", "Social", "Personal", "Education", "Conclusion", "Works-Cited"] : args
    };
};
