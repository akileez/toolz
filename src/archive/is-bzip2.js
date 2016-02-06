'use strict'

// Check if a Buffer/Uint8Array is a BZIP2 file

function isBzip2 (buf) {
  if (!buf || buf.length < 3) return false

  return buf[0] === 0x42 && buf[1] === 0x5a && buf[2] === 0x68
}

module.exports = isBzip2
