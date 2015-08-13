var path = require('path')

function relative  (from, to) {
  var relativePath = path.relative(path.dirname(from), path.dirname(to))
  return path.join(relativePath, path.basename(to))
}

module.exports = relative
