var button = require("imports?this=>window!./button");
var checkbox = require("imports?this=>window!./checkbox");

require("./style.css");

module.exports = {
    bootstrap: function () {
        // initialize all modules
        button.init();
        checkbox.init();
    }
};
