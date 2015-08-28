function isStream (val) {
  return val !== null && typeof val === 'object' && typeof val.pipe === 'function'
}

function writable (val) {
  return isStream(val)
    && val.writable !== false
    && typeof val._write == 'function'
    && typeof val._writableState == 'object'
}

function readable (val) {
  return isStream(val)
    && val.readable !== false
    && typeof val._read == 'function'
    && typeof val._readableState == 'object'
}

function duplex (val) {
  return writable(val) && readable(val)
}

module.exports = isStream
module.exports.readable = readable
module.exports.writable = writable
module.exports.duplex = duplex
