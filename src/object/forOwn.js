var hasOwn = require('./hasOwn')
var forIn  = require('./forIn')

function forOwn (obj, fn, thisObj) {
  if (thisObj == undefined) {
    forIn(obj, function (val, key) {
      if (hasOwn(obj, key)) fn(obj[key], key, obj)
    })
  } else {
    forIn(obj, function (val, key) {
      if (hasOwn(obj, key)) fn.call(thisObj, obj[key], key, obj)
    })
  }
}

module.exports = forOwn
