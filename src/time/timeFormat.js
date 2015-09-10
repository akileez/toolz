// adopted from: https://github.com/sindresorhus/pretty-ms
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

var parseMs = require('./parseMs')
var plural = require('../string/plural')
var isFinite = require('../lang/isFinite')

function timeFormat (ms, opts) {
  if (!isFinite(ms)) throw new TypeError('Expected a finite number')
  opts = opts || {}

  if (ms < 1000) {
    return Math.ceil(ms)
      + (opts.verbose
        ? ' ' + plural('millisecond', Math.ceil(ms))
        : 'ms'
      )
  }

  var ret = []
  var add = function (val, long, short, valStr) {
    if (val === 0) return
    var postfix = opts.verbose ? ' ' + plural(long, val) : short
    ret.push((valStr || val) + postfix)
  }

  var parsed = parseMs(ms)

  add(parsed.days, 'day', 'd')
  add(parsed.hours, 'hour', 'h')
  add(parsed.minutes, 'minute', 'm')

  if (opts.compact) {
    add(parsed.seconds, 'second', 's')
    return '~' + ret[0]
  }

  var sec = ms / 1000 % 60
  var secDecimalDigits = typeof opts.secDecimalDigits === 'number'
    ? opts.secDecimalDigits
    : 1
  var secStr = sec.toFixed(secDecimalDigits).replace(/\.0$/, '')
  add(sec, 'second', 's', secStr)

  return ret.join(' ')
}

module.exports = timeFormat
