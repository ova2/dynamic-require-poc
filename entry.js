require("./style.css");
require("imports?this=>window!./button.js");

document.addEventListener("DOMContentLoaded", function (event) {
    window.lazyLoadedModule = require("bundle?lazy!./lazyloaded.js");
    
    var btn = document.getElementById("btn");
    btn.setAttribute('data-onclick', '["lazyLoadedModule", "alert"]');
});

// https://www.sitepoint.com/understanding-module-exports-exports-node-js/