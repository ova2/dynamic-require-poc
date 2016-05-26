var objectifier = require("./../util-module/objectifier.js");

module.exports = {
    init: function () {
        var elements = document.querySelectorAll('[data-init="button"]');
        for (var i = 0; i < elements.length; i++) {
            (function () {
                var element = elements[i];
                
                var onclick = function () {
                    var data = element.getAttribute("data-onclick");
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

                element.addEventListener("click", onclick);
            })();
        }
        
        return elements;
    },

    doSomething: function () {
        // ...
    }
};
