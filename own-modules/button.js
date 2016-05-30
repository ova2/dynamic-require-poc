var Promise = require('promise-light');

module.exports = {
    alertSync: function (element) {
        document.getElementById('output').innerHTML = 'Clicked button. Sync. call is OK';
        return Promise.resolve('OK');
    },
    
    alertAsyncValid: function (element) {
        return new Promise(function setup(resolve, reject) {
            setTimeout(function () {
                document.getElementById('output').innerHTML = 'Clicked button. Async. call is OK';
                resolve('OK');
            }, 1000);
        });
    },
    
    alertAsyncInvalid: function (element) {
        return new Promise(function setup(resolve, reject) {
            setTimeout(function () {
                document.getElementById('output').innerHTML = 'Clicked button. Async. call has ERROR';
                reject('ERROR');
            }, 1000);
        });
    }
};