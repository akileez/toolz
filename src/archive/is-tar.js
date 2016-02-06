// is-tar <https://github.com/kevva/is-tar>
// Copyright (c) Kevin Mårtensson <kevinmartensson@gmail.com> (MIT)

'use strict'

// Check if a Buffer/Uint8Array is a TAR file

function isTar (buf) {
  if (!buf || buf.length < 262) return false

  return buf[257] === 0x75
    && buf[258] === 0x73
    && buf[259] === 0x74
    && buf[260] === 0x61
    && buf[261] === 0x72
}

module.exports = isTar
