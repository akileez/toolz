var writeFile = require('./writeFile')

function writeJSON (file, obj, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {
      replacer: null,
      spaces: 2
    }
  }

  try {
    var json = JSON.stringify(
      obj,
      opts.replacer ? opts.replacer : null,
      opts.spaces ? opts.spaces : 2
    ) + '\n'
  } catch (err) {
    if (cb) return cb(err, null)
  }

  writeFile(file, json, cb)
}

function writeJSONsync (file, obj, opts) {
  opts = opts || {
    replacer: null,
    spaces: 2
  }

  try {
    var json = JSON.stringify(
      obj,
      opts.replacer ? opts.replacer : null,
      opts.spaces ? opts.spaces : 2
    ) + '\n'
  } catch (err) {
    throw err
  }

  writeFile(file, json)
}

module.exports = writeJSON
module.exports.sync = writeJSONsync
