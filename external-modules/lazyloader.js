/**
 Loads modules specified via data-* attributes and executes the specified function.
 HTML-Example:

 <button data-init="button" data-onclick='["ownModules.button", "alertSync"]'>
    ...
 </button>

 The function ownModules.button.alertSync(button) will be executed.
 */

var objectifier = require("./../common-modules/objectifier");

module.exports = {
    /**
     * EExecutes the specified synchronous or asynchronous function from the specified module
     * and invokes resolved or rejected callbacks respectively.
     * The function should return a promise.
     * 
     * @param element HTML element where data-* is defined
     * @param data value of data-* as string
     * @param resolvedCallback callback which gets executed when the returned promise is fullfilled
     * @param rejectedCallback callback which gets executed when the returned promise is rejected
     */
    execute: function (element, data, resolvedCallback, rejectedCallback) {
        var strData = element.getAttribute(data);
        if (strData) {
            var objData = JSON.parse(strData);
            var module = objData[0];
            var func = objData[1];

            if (module && objectifier.exists(module) && func) {
                // module and function exist ==> load the module
                objectifier.get(module)(function (module) {
                    // execute the specified function from the module.
                    // return value is a promise (see https://www.npmjs.com/package/promise-light)
                    module[func](element).then(
                        function resolved(value) {
                            resolvedCallback(value);
                        },
                        function rejected(error) {
                            rejectedCallback(error);
                        });
                });
            }
        }
    }
};
