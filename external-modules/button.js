var lazyloader = require("./lazyloader");

module.exports = {
    init: function () {
        var elements = document.querySelectorAll('[data-init="button"]');
        for (var i = 0; i < elements.length; i++) {
            (function () {
                var element = elements[i];

                // onlick event handler
                var onclick = function () {
                    // so something module specific ...

                    // execute function defined via data-onclick attribute if it's defined,
                    // e.g. data-onclick='["ownModules.button", "alertSync"]'
                    lazyloader.execute(element, 'data-onclick',
                        function resolved(value) {
                            alert(value);
                        }, function rejected(error) {
                            alert(error);
                        });
                };

                element.addEventListener("click", onclick);
            })();
        }

        return elements;
    },

    doSomething: function () {
        // ...
    }
};
