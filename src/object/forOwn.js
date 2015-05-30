var forIn = require('./forIn')
var hasOwn = require('./hasOwn')

function forOwn (obj, fn, thisObj) {
  forIn(obj, function (value, key) {
    if (hasOwn(obj, key)) return fn.call(thisObj, obj[key], key, obj)
  })
}

module.exports = forOwn
