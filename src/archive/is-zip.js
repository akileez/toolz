// https://github.com/kevva/is-zip
// Copyright (c) Kevin Mårtensson <kevinmartensson@gmail.com> (MIT)

'use strict'

// Check if a Buffer/Uint8Array is a ZIP file

function isZip (buf) {
  if (!buf || buf.length < 4) return false

  return buf[0] === 0x50
    && buf[1] === 0x4b
    && (buf[2] === 0x03 || buf[2] === 0x05 || buf[2] === 0x07)
    && (buf[3] === 0x04 || buf[3] === 0x06 || buf[3] === 0x08)
}

module.exports = isZip
