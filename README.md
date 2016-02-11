# toolz
[![schoolmarm-standard-style][marm-image]][marm-url]
[![experimental][stability-image]][stability-url]
[![phase][phase-image]][phase-url]
[![ISC license][license-img]][license-url]

> development tools for node, devtoolz. 

This project started off as a semi-complete rewrite of [mout.js](http://moutjs.com), a modularization of [async.js](https://github.com/caolan/async) and a peppering of [lodash](https://lodash.com) (with a couple tibits from underscore.string) all for educational purposes. It has morphed into an everything I might possibly use, including the kitchen sink,
type of library. 

At present, my focus is to get a handle on `streams`, `promises`, `factory functions` (in particular `constructors`), `bind`, `apply`, `call`, `errors`, `emitters` and `http`.

This library will forever be experimental with the potential to change at any moment. 

The focus here is node. Server-side use is more inline with my thinking. 


## Why?
Eduction first and foremost. 


## Installation
```bash
$ npm install akileez\toolz
```

## Usage
Each method is a separate module, so require only the methods you need (At present the are over 800 modules contained within). The ability to require collections or the entire library has been removed. This collection of toolz has grown too large for loading the entire set.

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
Documentation has been eliminated. Another solution is being developed.


## See Also
- [mout.js](http://moutjs.com)
- [async.js](https://github.com/caolan/async)
- [lodash](https://lodash.com)

## License
[ISC](https://tldrlegal.com/license/ISC-license)

[marm-image]: https://img.shields.io/badge/code%20style-marm-brightgreen.svg?style=flat-square
[marm-url]: https://github.com/akileez/eslint-config-marm
[stability-image]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[stability-url]: https://github.com/akileez/toolz
[phase-image]: https://img.shields.io/badge/phase-expansion-red.svg?style=flat-square
[phase-url]: https://github.com/akileez/toolz
[license-img]: https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square
[license-url]: https://github.com/akileez/toolz/blob/master/license.md

