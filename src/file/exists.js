var fs = require('fs')

function exists (fp, cb) {
  if (arguments.length === 1) {
    try {
      fs.accessSync(fp)
      return true
    } catch (err) {
      return false
    }
  }

  fs.access(fp, fs.F_OK, function (err) {
    cb(!(err))
  })
}

module.exports = exists
