// adopted from: ms.js <https://github.com/rauchg/ms.js>
// Copyright (c) 2014 Guillermo Rauch <rauchg@gmail.com>

// Constants
var s = 1000
var m = 60000 // s * 60
var h = 3600000 // m * 60
var d = 86400000 // h * 24
var y = 31557600000 // d * 365.25
var types = {
  'years': y,
  'year': y,
  'yrs': y,
  'yr': y,
  'y': y,
  'days': d,
  'day': d,
  'd': d,
  'hours': h,
  'hour': h,
  'hrs': h,
  'hr': h,
  'h': h,
  'minutes': m,
  'minute': m,
  'mins': m,
  'min': m,
  'm': m,
  'seconds': s,
  'second': s,
  'secs': s,
  'sec': s,
  's': s,
  'milliseconds': 1,
  'millisecond': 1,
  'msecs': 1,
  'msec': 1,
  'ms': 1
}

// Parse or format the given `val` [String|Number]
// Options: `long` verbose formatting [false]
module.exports = function (val, options) {
  options = options || {}
  if (typeof val === 'string') return parse(val)

  return options.long
    ? long(val)
    : short(val)
}

// Parse the given `str` and return milliseconds
function parse (str) {
  str = '' + str
  // istanbul ignore if
  if (str.length > 10000) return

  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)

  if (!match) return

  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()

  return n * types[type]
}

// Short format for `ms`
function short (ms) {
  if (ms >= d) return Math.round(ms / d) + 'd'
  if (ms >= h) return Math.round(ms / h) + 'h'
  if (ms >= m) return Math.round(ms / m) + 'm'
  if (ms >= s) return Math.round(ms / s) + 's'
  return ms + 'ms'
}

// Long format for `ms`
function long (ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms'
}

// Pluralization helper.
function plural (ms, n, name) {
  if (ms < n) return
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name
  return Math.ceil(ms / n) + ' ' + name + 's'
}
