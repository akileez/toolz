// is-glob <https://github.com/jonschlinkert/is-glob> Licensed under the MIT License
// Copyright (c) 2014-2015, Jon Schlinkert.

function isGlob (str) {
  return typeof str === 'string' && /[@!*+{}?(|)[\]]/.test(str)
}

module.exports = isGlob
