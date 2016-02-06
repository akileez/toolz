'use strict'

// Check if a Buffer/Uint8Array is a RAR file

function isRAR (buf) {
  if (!buf || buf.length < 7) return false

  return buf[0] === 0x52
    && buf[1] === 0x61
    && buf[2] === 0x72
    && buf[3] === 0x21
    && buf[4] === 0x1a
    && buf[5] === 0x07
    && (buf[6] === 0x00 || buf[6] === 0x01)
}

module.exports = isRAR
