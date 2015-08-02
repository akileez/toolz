# toolz
[![NPM version][npm-image]][npm-url]
[![js-standard-style][standard-image]][standard-url]
[![experimental][stability-image]][stability-url]
[![ISC license][license-img]][license-url]

> development tools for node, devtoolz. 

A semi-complete rewrite of [mout.js](http://moutjs.com), a modularization of [async.js](https://github.com/caolan/async) and a peppering of [lodash](https://lodash.com) all for educational purposes (with a couple tibits from underscore.string). 

There is no intention of competing with these giants. Please, I advocate, USE mout.js/lodash/async/underscore.string or any other library that fits your needs. This library will forever be experimental with the potential to change at any moment. 

The focus here is node. Although the above libraries work in the browser, changes I have made or will make in the future will ensure breakage somewhere along the line. Server-side use is more inline with my thinking -- but I did say these were devtoolz. 

**Warning!!!** there are bugs. This code was hand typed. It is not ready for even development yet.

## Why?
Why would I do something stupid like re-writing portions of these libs when I could easily clone or fork them? TO LEARN, PERIOD. While I am retyping everything in, I get intimate with the code. I am able to play with each function, learn it inside out.

## Goals

- eduction first and foremost
- understanding the complexities of a large project
- automated build system for filesets and documentation (eventually)
- formal testing with unit-tests (**!**console.log) (eventually)
- goto library for my handlebars helpers 
- practice typing in personal code style

## Installation
```bash
$ npm install akileez\toolz
```

## Usage
As with mout.js, each method is a separate module, so require only the methods you need:   
Note: the ability to require collections or the entire library has been removed. This collection
of toolz has grown too large for loading the entire set.

```js
// individual methods (recommended)
var nameOfDay = require('toolz/src/date/nameOfDay')
nameOfDay(new Date(), 2) // We (Wednesday)

var nameOfMonth = require('toolz/src/date/nameOfMonth')
nameOfMonth(new Date()) // June
nameOfMonth(new Date(), 3) // Jun

var extend = require('toolz/src/object/extend')
extend({}, {a: "Hello", b: "World"}) // {a: "Hello", b: "World"}

```
There is no documentation at the moment. Only markdown files from mout and async in the doc folder. 


## See Also
- [mout.js](http://moutjs.com)
- [async.js](https://github.com/caolan/async)
- [lodash](https://lodash.com)

## License
[ISC](https://tldrlegal.com/license/ISC-license)

[npm-image]: https://img.shields.io/npm/v/toolz.svg?style=flat-square
[npm-url]: https://npmjs.org/package/toolz
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[stability-image]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[stability-url]: https://github.com/akileez/toolz
[license-img]: https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square
[license-url]: https://github.com/akileez/toolz/blob/master/license.md

