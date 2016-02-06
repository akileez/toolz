// is-gzip-file <https://github.com/jkriss/is-gzip-file>
// Copyright (c) 2015 Jesse Kriss (MIT)

var fs = require('fs')
var isGzip = require('./is-gzip')

/*
isGzipFile reads the first two bytes of a file to see if they match the magic number for gzip (1f 8b).

This is useful if you have a gzip task that shouldn't reprocess files, or if you have a web server that is server pre-gzipped files (without a .gz suffix).
 */

function isGzipFile (filepath) {
  var buf = new Buffer(3)
  var fd = fs.openSync(filepath, 'r')
  fs.readSync(fd, buf, 0, 3)
  fs.closeSync(fd)
  return isGzip(buf)
}

module.exports = isGzipFile
