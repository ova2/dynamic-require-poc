var objectifier = require("./../util-module/objectifier.js");

module.exports = {
    init: function () {
        var elements = document.querySelectorAll('[data-init="checkbox"]');
        for (var i = 0; i < elements.length; i++) {
            (function () {
                var element = elements[i];
                
                var onchange = function () {
                    var data = element.getAttribute("data-onchange");
                    if (data) {
                        var objData = JSON.parse(data);
                        var module = objData[0];
                        var func = objData[1];

                        if (module && objectifier.exists(module) && func) {
                            objectifier.get(module)(function (file) {
                                file[func]();
                            });
                        }
                    }
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
