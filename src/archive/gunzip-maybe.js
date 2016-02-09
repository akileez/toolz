var zlib      = require('zlib')
var isGzip    = require('./is-gzip')
var isDeflate = require('./is-deflate')
var peek      = require('../stream/peek-stream')
var through   = require('../stream/through2')
var pumpify   = require('../stream/pumpify')

var isCompressed = function (data) {
  if (isGzip(data)) return 1
  if (isDeflate(data)) return 2
  return 0
}

var gunzip = function () {
  return peek({newline: false, maxBuffer: 10}, function (data, swap) {
    switch (isCompressed(data)) {
      case 1:
        swap(null, pumpify(zlib.createGunzip(), gunzip()))
        break
      case 2:
        swap(null, pumpify(zlib.createInflate(), gunzip()))
        break
      default:
        swap(null, through())
    }
  })
}

module.exports = gunzip
