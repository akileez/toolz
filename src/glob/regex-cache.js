// adopted from: regex-cache <https://github.com/jonschlinkert/regex-cache>
// Copyright (c) 2015 Jon Schlinkert. (MIt)

'use strict';

var equal = require('./is-equal-shallow')

// Expose the cache
var cache = module.exports.cache = {}
var basic = module.exports.basic = {}

// Memoize the results of a call to the new RegExp constructor.
function regexCache (fn, str, opts) {
  var key = '_default_'
  var regex
  var cached

  if (!str && !opts) {
    if (typeof fn !== 'function') return fn

    return basic[key] || (basic[key] = fn())
  }

  var isString = typeof str === 'string'

  if (isString) {
    if (!opts) return basic[str] || (basic[str] = fn(str))
    key = str
  } else {
    opts = str
  }

  cached = cache[key]

  if (cached && equal(cached.opts, opts)) return cached.regex

  memo(key, opts, (regex = fn(str, opts)))
  return regex
}

function memo (key, opts, regex) {
  cache[key] = {
    regex: regex,
    opts: opts
  }
}

module.exports = regexCache
