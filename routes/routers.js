var _ = require("underscore");
var page = require("../containers/page");
var title = require("../containers/title");
var tabs = require("../containers/tabs");

// List of routers
module.exports = {
    "index": page(title("Leaders")),
    "traits": page(title("Traits - Leaders"), { nothomepage: true }, tabs(0))
};
