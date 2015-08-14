var fs = require('fs')

function exists (filepath, cb) {
  fs.access(filepath, fs.F_OK, function (err) {
    cb(err ? false, true)
  })
}

function existsSync (filepath) {
  try {
    fs.accessSync(filepath)
    return true
  } catch (err) {
    return false
  }
}

module.exports = {
  async: exists,
  sync: existsSync
}
