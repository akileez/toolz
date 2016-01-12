var readFile = require('../file/readFile')
var extend = require('../object/extend')
var YAML = require('./lib/Yaml')

var defaults = {throws: false}

function readYAML (file, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  } else {
    opts = extend(defaults, opts)
  }

  readFile(file, function (err, data) {
    if (err) return cb(err)
    try {
      var yaml = YAML.parse(data)
    } catch (err0) {
      return cb(err0)
    }

    cb(null, yaml)
  })
}

function readYAMLsync (file, opts) {
  opts = opts
    ? extend(defaults, opts)
    : defaults

  if (opts.throws) return YAML.parse(readFile(file))
  else {
    try {
      return YAML.parse(readFile(file))
    } catch (err) {
      return null
    }
  }
}

module.exports = readYAML
module.exports.sync = readYAMLsync
