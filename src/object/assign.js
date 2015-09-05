// adopted from: <https://github.com/jonschlinkert/assign-value>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var isObject = require('../lang/isObject')
var extend = require('./extend')
var get = require('./get')
var set = require('./set')

function assignValue (obj, prop, value) {
  if (!isObject(obj))
    throw new TypeError('assignValue expects first arg to be an object')

  if (typeof prop === 'undefined' && typeof value === 'undefined')
    return obj

  if (typeof value === 'undefined' && isObject(prop))
    return extend(obj, prop)

  set(obj, prop, extend({}, get(obj, prop), value))

  return obj
}

module.exports = assignValue
