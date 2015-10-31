// adopted from set-value <>
//

var extend = require('./extend')
var toPath = require('./toPath')


function setvalue (obj, path, val) {
  if (typeof obj !== 'object') return obj
  if (Array.isArray(path)) path = toPath(path)
  if (typeof path !== 'string') return obj

  var segs = path.split('.')
  var len = segs.length
  var i = -1
  var res = obj
  var last

  while (++i < len) {
    var key = segs[i]

    if (i === len - 1) {
      last = key
      break
    }

    if (typeof obj[key] !== 'object') obj[key] = {}

    obj = obj[key]
  }

  if (obj.hasOwnProperty(last) && typeof obj[last] === 'object') extend(obj[last, val])
  else obj[last] = val

  return res
}

module.exports = setvalue
