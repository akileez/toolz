// adeopted from: https://github.com/75lb/byte-size
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)
// default values are IEC (International Electrotechnical Commission)

function bytesConvert (bytes, opts) {
  var defs = {units: 'iec', precision: 2}

  opts = opts || {}
  opts.units = opts.units || defs.units
  opts.precision = opts.precision || defs.precision

  var matrix = [
    {from: 0, to: 1, metric: 'B', iec: 'B'},
    {from: 1, to: 2, metric: 'kB', iec: 'KiB'},
    {from: 2, to: 3, metric: 'MB', iec: 'MiB'},
    {from: 3, to: 4, metric: 'GB', iec: 'GiB'},
    {from: 4, to: 5, metric: 'TB', iec: 'TiB'},
    {from: 5, to: 6, metric: 'PB', iec: 'PiB'},
    {from: 6, to: 7, metric: 'EB', iec: 'EiB'},
    {from: 7, to: 8, metric: 'ZB', iec: 'ZiB'},
    {from: 8, to: 9, metric: 'YB', iec: 'YiB'}
  ]

  var base = opts.units === 'iec' ? 1024 : 1000
  var i = -1
  var len = matrix.length

  while (++i < len) {
    var lower = Math.pow(base, matrix[i].from)
    var upper = Math.pow(base, matrix[i].to)

    if (bytes >= lower && bytes < upper) {
      var units = matrix[i][opts.units]

      if (i === 0) return bytes + ' ' + units
      else return (bytes / lower).toFixed(opts.precision) + ' ' + units
    }
  }

  return bytes
}

module.exports = bytesConvert
