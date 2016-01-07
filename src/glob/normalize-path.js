// adlopted from: normalize-path <https://github.com/jonschlinkert/normalize-path>
// Copyright (c) 2014-2015, Jon Schlinkert (MIT)

function normalizePath (str, stripTrailing) {
  if (typeof str !== 'string') throw new TypeError('expected a string')

  str = str.replace(/[\\\/]+/g, '/')
  if (stripTrailing !== false) str = str.replace(/\/$/, '')

  return str
}

module.exports = normalizePath
