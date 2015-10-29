var isObject = require('../lang/isObject')
var longish  = require('../array/longish')
var pad      = require('../string/padRight')
var keys     = require('../object/keys')
var assert   = require('assert')

function alignKeys (obj) {
  assert(isObject(obj), 'expects an object as input')

  var keyz = keys(obj)
  var max  = longish(keyz).length
  var res  = {}

  var len = keyz.length
  var i = -1

  while (++i < len) {
    var key = keyz[i]
    var prop = pad(key, max, ' ')
    res[prop] = obj[key]
  }

  return res
}

module.exports = alignKeys
