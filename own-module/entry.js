var objectifier = require("./../util-module/objectifier.js");

require("./../external-module/style.css");
var button = require("imports?this=>window!./../external-module/button.js");
var checkbox = require("imports?this=>window!./../external-module/checkbox.js");

document.addEventListener("DOMContentLoaded", function (event) {    
    // initialize external module
    var buttons = button.init();
    if (buttons.length > 0) {
        // lazy load own module
        var lazyLoadedButton = require("bundle?lazy!./button.js");
        
        // pass callback from the own module (s. https://github.com/webpack/bundle-loader)        
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            objectifier.set('lazyLoadedModules.button', lazyLoadedButton);
            btn.setAttribute('data-onclick', '["lazyLoadedModules.button", "alert"]');
        }
    }
    
    // initialize external module
    var checkboxes = checkbox.init();
    if (checkboxes.length > 0) {
        // lazy load own module (s. https://github.com/webpack/bundle-loader)
        var lazyLoadedCheckbox = require("bundle?lazy!./checkbox");
        
        // pass callback from the own module
        for (var j = 0; j < checkboxes.length; j++) {
            var chkb = checkboxes[j];
            objectifier.set('lazyLoadedModules.checkbox', lazyLoadedCheckbox);
            chkb.setAttribute('data-onchange', '["lazyLoadedModules.checkbox", "alert"]');
        }
    }
});