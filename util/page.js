var _ = require("underscore");
// Shared similarites between pages
module.exports = function(specific) {
    var basic = {
        "title": "Page",
        "hero": {
            "src": "/assets/images/city.jpeg",
            "alt": "An iamge of a bustling city."
        },
        "info": [], "css": [], "js": [],
        "footbar": true,
    };
    return _.extend({}, basic, specific);
};
