var typecast = require('../string/typecast')
var isArray = require('../lang/isArray')
var hasOwn = require('../object/hasOwn')

// decode query string into an object of keys => vals

function decode (queryStr, shouldTypecast) {
  var queryArr = (queryStr || '').replace('?', '').split('&')
  var reg = /([^=]+)=(.+)/
  var i = -1
  var obj = {}
  var equalIndex
  var cur
  var pValue
  var pName

  while ((cur = queryArr[++i])) {
    equalIndex = cur.indexOf('=')
    pName = cur.substring(0, equalIndex)
    pValue = decodeURIComponent(cur.substring(equalIndex + 1))

    if (shouldTypecast !== false) pValue = typecast(pValue)

    if (hasOwn(obj, pName)) {
      if (isArray(obj[pName])) obj[pName].push(pValue)
      else obj[pName] = [obj[pName], pValue]
    } else {
      obj[pName] = pValue
    }
  }
  return obj
}

module.exports = decode
