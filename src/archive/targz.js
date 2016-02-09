// https://github.com/lafin/node-targz
// Copyright (c) 2014 lafin <kuvakin@gmail.com> (MIT)

var tar  = require('./tar-fs')
var zlib = require('zlib')
var fs   = require('fs')

function compress (params, cb) {
  cb = cb || function () {}

  var error = function (error) {
    throw error
  }

  process.nextTick(function () {
    tar.pack(params.source)
      .on('error', error)
      .pipe(zlib.createGzip({
        level: params.level || 6,
        memLevel: params.memLevel || 6
      }).on('error', error))
      .pipe(fs.createWriteStream(params.destination)
        .on('error', error)
        .on('finish', cb))
  })
}

function decompress (params, cb) {
  cb = cb || function () {}

  var error = function (error) {
    throw error
  }

  process.nextTick(function () {
    fs.createReadStream(params.source)
      .on('error', error)
      .pipe(zlib.createGunzip()
        .on('error', error))
      .pipe(tar.extract(params.destination)
        .on('error', error)
        .on('finish', cb))
  })
}

exports.compress = compress
exports.decompress = decompress
