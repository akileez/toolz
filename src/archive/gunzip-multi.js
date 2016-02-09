// https://github.com/eugeneware/gunzipMulti
// Copyright (c) 2016, Eugene Ware (BSD-3-Clause)

var stream = require('stream')
var spawn = require('child_process').spawn
var combiner = require('../stream/pumpify')

/*

The current node.gz zlib gunzip library has a bug where it doesn't correctly compress gzip files which are the concatenation of multiple gzip files. This is a valid gzip file according to the standard, and is used widely in such formats as the Web Archive format (WARC)

It isn't easy to get the inbuilt library to work or resume for the reason that the gzip file format doesn't include the length of the compressed data, only the uncompressed final file and CRC.

This module wraps the gzip binary installed in your path, or a path you pass it and uses it to do the unzipping.

The upside is that in my testing, the command line utility is much faster at doing the decompression!

    var gunzipMulti = require('gunzip-multi')
    var fs = require('fs')

    fs.createReadStream(fixture('concat.txt.gz'))
      .pipe(gunzipMulti())
      .pipe(process.stdout)

*/

function gunzipMulti(opts) {
  if (typeof opts === 'undefined') {
    opts = {
      path: 'gzip'
    }
  }

  var gu = spawn(opts.path, ['-cd'])
  return combiner(gu.stdin, gu.stdout)
}

module.exports = gunzipMulti
