# toolz
[![schoolmarm-standard-style][marm-image]][marm-url]
[![experimental][stability-image]][stability-url]
[![phase][phase-image]][phase-url]
[![ISC license][license-img]][license-url]

> development tools for node, devtoolz. 

This project is an everything I might possibly use, including kitchen sink, type of library. 
It will forever be experimental with the potential to change at any moment. The code focus is node. Server-side.

My present interest: `streams`, `async-flow-control`, `generators`, `factory functions`,
 `bind`, `apply`, `call`, `errors`, `debugging`, `emitters` and `http`.

## Why?
Eduction first and foremost. 


## Installation
```bash
$ npm install akileez\toolz
```

## Usage
Require the methods you need. Each method is a separate module. 

```js
// individual methods
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

