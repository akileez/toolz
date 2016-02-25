// Concat multiple arrays removing duplicates.

var unique = require('./unique')
var append = require('./append')

function union (arrs) {
  var results = []
  var i = -1
  var len = arguments.length

  while (++i < len) {
    if (!Array.isArray(arguments[i])) continue
    append(results, arguments[i])
  }

  return unique(results)
}

module.exports = union
