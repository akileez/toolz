'use strict'

const map     = require('../array/map')
const slice   = require('../array/slice')
const forEach = require('../array/forEach')

function dedent (strings) {
  let values = slice(arguments, 1)
  let raw

  if (typeof strings === 'string') {
    // dedent can be used as a plain function
    raw = [strings]
  } else {
    raw = strings.raw
  }

  // perform interpolation
  let result = ''
  let i = -1
  let rlen = raw.length

  while (++i < rlen) {
    result += raw[i]
      .replace(/\\\n[ \t]*/g, '') // join lines when there is a suppressed newline
      .replace(/\\`/g, '`')       // handle escaped backticks

    if (i < values.length) result += values[i]
  }

  // remove leading and trailing whitespace
  result = result.trim()

  // strip indentation
  const lines = result.split('\n')
  let mindent = null

  forEach(lines, (l) => {
    let m = l.match(/^ +/)

    if (m) {
      let indent = m[0].length

      if (!mindent) {
        mindent = indent // this is the first indented line
      } else {
        mindent = Math.min(mindent, indent)
      }
    }
  })

  if (mindent !== null) {
    result = map(lines, (l) => {
      return l[0] === ' '
        ? l.slice(mindent)
        : l
    }).join('\n')
  }

  // handle escaped newlines at the end to ensure they don't get stripped too
  return result.replace(/\\n/g, '\n')
}

module.exports = dedent
