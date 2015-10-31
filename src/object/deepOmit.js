var isObject = require('../lang/isPlainObject')
var forOwn = require('./forOwn')
var omit = require('./omit')

// from Jon Schlinkert omit-deep. Licensed under the MIT license.

function deepOmit (obj, props) {
  var o = {}

  forOwn(obj, function (val, key) {
    if (isObject(val)) o[key] = deepOmit(val, props)
    else o[key] = val
  })
  return omit(o, props)
}

module.exports = deepOmit
