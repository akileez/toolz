const stripAnsi = require('../util/strip-ansi')
const isFullWidthCodePoint = require('./is-fullwidth-code-point')

function stringWidth (str) {
  if (typeof str !== 'string' || str.length === 0) return 0

  str = stripAnsi(str)

  let width = 0
  let i = -1
  let len = str.length

  while (++i < len) {
    const code = str.codePointAt(i)

    // Ignore control characters
    if (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) continue
    // Ignore combining characters
    if (code >= 0x300 && code <= 0x36F) continue
    if (code >= 0xFFFF) ++i
    
    width += isFullWidthCodePoint(code) ? 2 : 1
  }

  return width
}

module.exports = stringWidth
