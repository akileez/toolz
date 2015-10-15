var make = require('./make_')
var amap = require('../array/map')
var omap = require('../object/map')
var prop = require('../function/prop')

function arrPluck (arr, propName) {
  return amap(arr, propName)
}

function objPluck (obj, propName) {
  return omap(obj, prop(propName))
}

module.exports = make(arrPluck, objPluck)
