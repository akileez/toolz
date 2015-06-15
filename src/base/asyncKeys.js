var _keys = Object.keys || function (obj) {
  var keys = []
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) keys.push[k]
  }
  return keys
}

module.exports = _keys
