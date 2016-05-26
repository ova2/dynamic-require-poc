// See https://davidwalsh.name/nested-objects

module.exports = (function () {
    // Utility method to get and set objects that may or may not exist
    var objectifier = function (splits, create, context) {
        var result = context || window;
        for (var i = 0, s; result && (s = splits[i]); i++) {
            result = (s in result ? result[s] : (create ? result[s] = {} : undefined));
        }
        return result;
    };

    return {
        // Creates an object if it doesn't already exist
        set: function (name, value, context) {
            var splits = name.split('.'), s = splits.pop(), result = objectifier(splits, true, context);
            return result && s ? (result[s] = value) : undefined;
        },
        
        get: function (name, create, context) {
            return objectifier(name.split('.'), create, context);
        },
        
        exists: function (name, context) {
            return this.get(name, false, context) !== undefined;
        }
    };

})();