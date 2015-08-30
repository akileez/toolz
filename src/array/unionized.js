function unionized (arrs) {
  var results = []
  var i = -1
  var j = -1
  var len = arguments.length

  while (++i < len) {
    var arg = toArray(arguments[i])
    while (++j < arg.length) {
      var ele = arg[j]
      if (results.indexOf(ele) === -1) results.push(ele)
    }
  }
  return results
}

function toArray (val) {
  return Array.isArray(val) ? val : [val]
}

module.exports = unionized
