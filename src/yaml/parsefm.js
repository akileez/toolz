var readFile = require('../file/readFile')
var extract = require('./fme')

function parse (input, cb) {
  readFile(input, function (err, res) {
    if (err) return cb(err)
    cb(null, extract(res))
  })
}

function parseSync (input) {
  return extract(readFile(input))
}

module.exports = parse
module.exports.sync = parseSync
