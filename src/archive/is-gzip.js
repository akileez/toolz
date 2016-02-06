// is-gzip <https://github.com/kevva/is-gzip>
// Copyright (c) Kevin Mårtensson <kevinmartensson@gmail.com> (MIT)

'use strict'

/*
    Check if a Buffer/Uint8Array is a GZIP file

    var read = require('fs').readFileSync;
    var isGzip = require('is-gzip');

    isGzip(read('foo.tar.gz'));
    //=> true

*/

function isGzip (buf) {
  if (!buf || buf.length < 3) return false

  return buf[0] === 0x1f && buf[1] === 0x8b && buf[2] === 0x08
}

module.exports = isGzip
