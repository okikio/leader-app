var _ = require("underscore");
var page = require("../containers/page");
var title = require("../containers/title");

// List of routers
module.exports = {
    "index": page(title("Leaders")),
    "traits": page(title("Traits - Leaders"), { nothomepage: true })
};
