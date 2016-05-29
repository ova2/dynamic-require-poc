var lazyloader = require("./lazyloader");

module.exports = {
    init: function () {
        var elements = document.querySelectorAll('[data-init="checkbox"]');
        for (var i = 0; i < elements.length; i++) {
            (function () {
                var element = elements[i];
                
                var onchange = function () {
                    // so something module specific ...

                    // execute function defined via data-onclick attribute if it's defined,
                    // e.g. data-onchange='["ownModules.checkbox", "alertSync"]'
                    lazyloader.execute(element, 'data-onchange',
                        function resolved(value) {
                            alert(value);
                        }, function rejected(error) {
                            alert(error);
                        });
                };

                element.addEventListener("change", onchange);
            })();
        }
        
        return elements;
    },

    doSomething: function () {
        // ...
    }
};
