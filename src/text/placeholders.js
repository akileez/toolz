// adeopted from: placeholders <https://github.com/jonschlinkert/placeholders>
// Copyright (c) 2015, Jon Schlinkert (MIT)

// a curried function using ./expand.js to replace placeholders

var extend = require('../object/extend')
var expand = require('./expand')

function placeholders (opts) {
  var defaults = extend({regex: /:([(\w ),]+)/g}, opts)

  return function interpol (val, locals) {
    if (arguments.length === 1 && !defaults.data) return interpol.bind(null, val)

    locals = extend({}, defaults.data, locals)
    return expand(val, locals, defaults.regex)
  }
}

module.exports = placeholders
