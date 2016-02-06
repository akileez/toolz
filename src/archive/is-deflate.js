// https://github.com/watson/is-deflate
// Copyright (c) 2016 Thomas Watson Steen (MIT)

'use strict'

// Check if a given Buffer or Uint8Array is deflate compressed.

function isDeflate (buf) {
  if (!buf || buf.length < 2) return false

  return buf[0] === 0x78 && (buf[1] === 1 || buf[1] === 0x9c || buf[1] === 0xda)
}

module.exports = isDeflate
