var unique = require('./unique')
var append = require('./append')

function union (arrs) {
  var results = []
  var i = -1
  var len = arguments.length
  while (++i < len) {
    append(results, arguments[i])
  }
  return unique(results)
}

module.exports = union
