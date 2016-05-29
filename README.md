# Lazy inter-module communication with require and webpack

POC for truly dynamic require with webpack

See [Wikipedia][Wikipedia] for more information.

## Install

```sh
$ npm install gulp-print-spacesavings --save-dev
```

## Usage

The plugin has zero configuration. There are two methods `init` and `print` which should be called __before__ and __after__ any Gulp compression plugin respectively. An example for `gulp-clean-css` and `gulp-uglify` is shown below.

```js
var gulp = require('gulp');
```

The output is displayed in the form of a table.

![Screenshot](https://raw.githubusercontent.com/ova2/gulp-print-spacesavings/master/space-savings-output.png)

As you can see, the plugin also displays a footer with total uncompressed, compressed sizes and space savings if there are more than one file.

[Wikipedia]: https://en.wikipedia.org/wiki/Data_compression_ratio

https://www.npmjs.com/package/promise-light
