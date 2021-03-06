var Stream = (function () {
  try {
    // hack to fix a circular dependency issue when used with browserify
    return require('st' + 'ream')
  } catch (_) {}
}())

exports             = module.exports = require('./lib/_stream_readable.js')
exports.Stream      = Stream || exports
exports.Readable    = exports
exports.Writable    = require('./lib/_stream_writable.js')
exports.Duplex      = require('./lib/_stream_duplex.js')
exports.Transform   = require('./lib/_stream_transform.js')
exports.PassThrough = require('./lib/_stream_passthrough.js')