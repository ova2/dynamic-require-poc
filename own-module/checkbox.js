var Promise = require('promise-light');

module.exports = {
    alertSync: function (element) {
        document.getElementById('output').innerHTML = 'Changed checkbox. Sync. call is OK';
        return Promise.resolve('OK');
    },
    
    alertAsyncValid: function (element) {
        return new Promise(function setup(resolve, reject) {
            setTimeout(function () {
                document.getElementById('output').innerHTML = 'Changed checkbox. Async. call is OK';
                resolve('OK');
            }, 1000);
        });
    },
    
    alertAsyncInvalid: function (element) {
        return new Promise(function setup(resolve, reject) {
            setTimeout(function () {
                document.getElementById('output').innerHTML = 'Changed checkbox. Async. call has ERROR';
                reject('ERROR');
            }, 1000);
        });
    }
};