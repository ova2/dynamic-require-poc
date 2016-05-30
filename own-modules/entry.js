var objectifier = require("./../common-modules/objectifier");
var bootstrap = require("./../external-modules/bootstrap");

document.addEventListener("DOMContentLoaded", function (event) {    
    // initialize external modules
    bootstrap.bootstrap();
    
    // lazy load own modules (s. https://github.com/webpack/bundle-loader)
    var lazyLoadedButton = require("bundle?lazy!./button");
    var lazyLoadedCheckbox = require("bundle?lazy!./checkbox");
    
    // and put them under namespaces ownModules.button and ownModules.checkbox resp. 
    objectifier.set('ownModules.button', lazyLoadedButton);
    objectifier.set('ownModules.checkbox', lazyLoadedCheckbox);
});