# Proof of Concept for lazy inter-module communication with require() and webpack

## Motivation

CommonJS' modules can be loaded on demand with `require.ensure(...)`. Example:

```js
require.ensure(["module-a"], function(require) {
    var a = require("module-a");
    // module-a can be used now ...
});
```

The well-known module bundler __Webpack__ supports this syntax for loading modules on demand. Such lazy loaded module(s) define a [split point][split point]. Split points split the codebase into "chunks" (separate JavaScript files) which are loaded on demand. This feature allows to keep the initial download small and only download the code when it's requested.

Webpack performs a static analysis of the code at the project build time. Dynamic information is only available at runtime and not available at build time. You have to define your modules as constants. This leads to the problem. The following code will not work:

```js
var modA = "module-a";
require.ensure([modA], function(require) {
    var a = require("module-a");
    // module-a can be used now ...
});
```

Webpack says something like:

```sh
Error: Module not found. A dependency to an entry point is not allowed.
```

Theoretically you can use [require.context][require.context], but this needs some parts of module's path as constants too. Now, imagine you develop a modular UI library and would like to provide some callbacks for certain events (event handlers). Users of your library use it as a third-party library. They want to register their custom callback functions from their own modules. And they want to be called lazy, on demand, when an event occurs. You have many users and your library doesn't know about custom modules of course. That means, you can not hard-code module's path and function's name a priori. What to do?

## Solution

This POC demonstrates how to use truly dynamic `require` with webpack. It simulates third-party and own modules. The project structure:

```sh
index.html          // some HTML template from the third-party UI library 
external-modules    // third-party library with CommonJS modules
own-modules         // some library with CommonJS modules which uses the third-party library
common-modules      // simple utility modules
```

The modules in `external-modules` don't know about `own-modules`. Modules in the `own-modules` import modules from the `external-modules`. The most important webpack loader we use in this POC is [bundle loader for webpack][bundle loader for webpack]. This loader creates a special function with required module which can be executed lazily. The required module gets loaded when the function is executed.

The HTML template in the POC, backed by the third-party (external) modules, look like as follows (only short snippet):

```html
<button data-init="button" data-onclick='["ownModules.button", "alertSync"]'>
    Try sync. call (ok)
</button>
<p></p>
<button data-init="button" data-onclick='["ownModules.button", "alertAsyncValid"]'>
    Try async. call (ok)
</button>
<p></p>
<button data-init="button" data-onclick='["ownModules.button", "alertAsyncInvalid"]'>
    Try async. call (error)
</button>
```

The full code can be found in `index.xhtml`. The callback functions are defined as values of `data-*` attributes. Example: `data-onclick='["ownModules.button", "alertSync"]'`. Here, the function `alertSync` from the namespace `ownModules.button` wants to be called when the button is clicked. The namespace is a simple JavaScript object defined in the global window scope.

The module's functions in the folder `own-modules` returns __Promises__. Promises allow asynchronous callbacks. In the POC, the NPM module [promise light][promise light] is used. If you have jQuery in your web app, you can use [jQuery Deferred Object][jQuery Deferred Object] as well because it provides the same functionality. The sample implementation of the `button.js` looks like as

```js
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
```

The external modules should be bootstrapped by the own modules. The bootstrapping occurs in the file `entry.js` which acts as an entry point in the webpack configuration.

```js
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
```

As you can see, the [bundle loader for webpack][bundle loader for webpack] is applied to the own modules. The returned functions are saved under arbitrary namespaces in order to be executed later in external modules. Note: the `objectifier` is just a CommonJS module porting of the beautiful [getter and setter implementation for nested objects][getter and setter implementation for nested objects]. 

The caller gets a promise when invoking such asynchronous function. A promise normally has two 

Initial load

![Screenshot](https://raw.githubusercontent.com/ova2/dynamic-require-poc/master/init-load.png)

First chunk is loaded

![Screenshot](https://raw.githubusercontent.com/ova2/dynamic-require-poc/master/chunk-1.png)

Second chunk is loaded

![Screenshot](https://raw.githubusercontent.com/ova2/dynamic-require-poc/master/chunk-2.png)

## Install

```sh
$ npm install
$ npm run build
```

Install and run a web server afterwards, e.g. [WebServer for Chrome][WebServer for Chrome]. Open `index.html`, e.g. in Chrome, and look the Network tab when interacting with the web app.

[split point]: https://webpack.github.io/docs/code-splitting.html
[require.context]: https://webpack.github.io/docs/context.html
[bundle loader for webpack]: https://github.com/webpack/bundle-loader
[promise light]: https://www.npmjs.com/package/promise-light
[jQuery Deferred Object]: https://api.jquery.com/category/deferred-object
[getter and setter implementation for nested objects]: https://davidwalsh.name/nested-objects
[WebServer for Chrome]: https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en
