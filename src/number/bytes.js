// adeopted from: byte-size <https://github.com/75lb/byte-size> and
// pretty-bytes <https://github.com/sindresorhus/pretty-bytes>

// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT
// respectively.)

// default values are IEC (International Electrotechnical Commission)

function bytes (num, opts) {
  opts = opts || {}

  var defs = {
    units: 'iec',
    precision: 2,
    metric: ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    iec: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  }

  opts.units = opts.units || defs.units
  opts.precision = opts.precision || defs.precision

  var exp
  var base
  var unit
  var units

  if (opts.units === 'metric') {
    base = 1000
    units = defs.metric
  } else {
    base = 1024
    units = defs.iec
  }

  var neg = num < 0

  if (neg) num = -num
  if (num < 1) return (neg ? '-' : '') + num + ' B'

  exp = Math.min(Math.floor(Math.log(num) / Math.log(base)), units.length - 1)
  num = (num / Math.pow(base, exp)).toFixed(opts.precision) * 1
  unit = units[exp]

  return (neg ? '-' : '') + num + ' ' + unit
}

module.exports = bytes
