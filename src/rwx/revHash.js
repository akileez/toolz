var crypto = require('crypto')

function revHash (buf, opts) {
  opts = opts || {}

  return crypto
    .createHash(opts.algo || 'md5')
    .update(buf)
    .digest(opts.enc || 'hex')
    .slice(0, opts.len || 10)
}

module.exports = revHash
