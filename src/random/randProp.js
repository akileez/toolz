// random-obj-prop <https://github.com/sindresorhus/random-obj-prop>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

var random = require('./random')

/*
  Get a random property from an object

    var randomObjProp = require('random-obj-prop')
    randomObjProp({foo: 'pony', bar: 'unicorn'})
    //=> 'unicorn'
*/

function randProp (obj) {
  var keys = Object.keys(obj)
  return obj[keys[Math.floor(random() * keys.length)]]
}

module.exports = randProp
