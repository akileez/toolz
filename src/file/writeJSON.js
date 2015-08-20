var writeFile = require('./writeFile')
var extend = require('../object/extend')

var defaults = {
  replacer: null,
  spaces: 2
}

function writeJSON (file, obj, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = defaults
  } else {
    opts = extend(defaults, opts)
  }

  try {
    var json = JSON.stringify(
      obj,
      opts.replacer,
      opts.spaces
    ) + '\n'
  } catch (err) {
    if (cb) return cb(err, null)
  }

  writeFile(file, json, cb)
}

function writeJSONsync (file, obj, opts) {
  opts = opts
    ? extend(defaults, opts)
    : defaults

  try {
    var json = JSON.stringify(
      obj,
      opts.replacer,
      opts.spaces
    ) + '\n'
  } catch (err) {
    throw err
  }

  writeFile(file, json)
}

module.exports = writeJSON
module.exports.sync = writeJSONsync
