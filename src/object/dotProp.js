// adopted from: get-object <https://github.com/jonschlinkert/get-object>
// Copyright (c) 2014-2015 Jon Schlinkert, contributors. (MIT)

// just like ./get.js but with the ability to grab array values
// the return value is an object (plain or array) whereas `get`
// returns a string or undefined

var isNumber = require('../lang/isNumber')

function dotProp (obj, prop) {
  if (!prop) return obj
  if (!obj) return {}

  var segs = String(prop).split(/[[.\]]/).filter(Boolean)
  var last = segs[segs.length - 1]
  var res = {}

  while (prop = segs.shift()) {
    obj = obj[prop]
    if (!obj) return {}
  }

  if (isNumber(last)) return [obj]

  res[last] = obj
  return res
}

module.exports = dotProp
