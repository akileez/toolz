var readFile = require('../file/readFile')
var extend = require('../object/extend')

var defaults = {reviver: null, throws: false}

function readJSON (file, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {reviver: null}
  } else {
    opts = extend(defaults, opts)
  }

  readFile(file, function (err, data) {
    if (err) return cb(err)
    try {
      var json = JSON.parse(data, opts.reviver)
    } catch (err0) {
      return cb(err0)
    }

    cb(null, json)
  })
}

function readJSONsync (file, opts) {
  opts = opts
    ? extend(defaults, opts)
    : defaults

  if (opts.throws) return JSON.parse(readFile(file), opts.reviver)
  else {
    try {
      return JSON.parse(readFile(file), opts.reviver)
    } catch (err) {
      return null
    }
  }
}

module.exports = readJSON
module.exports.sync = readJSONsync
