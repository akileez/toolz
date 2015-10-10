// adeopted from: byte-size <https://github.com/75lb/byte-size> and
// pretty-bytes <https://github.com/sindresorhus/pretty-bytes>

// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT
// respectively.)

// default values are (ISO/IEC 80000) (International Electrotechnical Commission)
// reference: http://pacoup.com/2009/05/26/kb-kb-kib-whats-up-with-that/

function bytes (num, opts) {
  opts = defaultOps(opts)

  var exp
  var base
  var unit
  var units

  if (opts.units === 'metric') {
    base = 1000
    units = opts.metric
  } else {
    base = 1024
    units = opts.iec
  }

  var neg = num < 0

  // convert negative num to positive
  if (neg) num = -num
  if (num < 1) return (neg ? '-' : '') + num + ' B'

  exp = Math.min(Math.floor(Math.log(num) / Math.log(base)), units.length - 1)
  num = (num / Math.pow(base, exp)).toFixed(opts.precision) * 1
  unit = units[exp]

  return (neg ? '-' : '') + num + ' ' + unit
}

function defaultOps (opts) {
  opts = opts || {}
  opts.units = opts.units || 'iec'
  opts.precision = opts.precision || 2
  opts.metric = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  opts.iec = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  return opts
}

module.exports = bytes
