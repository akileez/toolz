// adopted from: https://github.com/jonschlinkert/expand
// Copyright (c) 2015, Jon Schlinkert (MIT)

var get = require('../object/get')
var kindOf = require('../lang/kindOf')
var isPrimitive = require('../lang/isPrimitive')

var cache = {prev: null}

function expand (val, data, opts) {
  return resolve(val, data || val, opts)
}

function resolve (val, data, opts) {
  switch(kindOf(val)) {
    case 'string': return resolveString(val, data, opts)
    case 'object': return resolveObject(val, data, opts)
    case 'array' : return resolveArray(val, data, opts)
    default      : return val
  }
}

function resolveString (str, data, opts) {
  // pass a regex as an option. not an object.
  var regex = opts || /\{\{([^\}]+)\}\}/g

  if (!regex.test(str)) return str
  var result = str

  str.replace(regex, function (match, es6, erb, index) {
    var prop = trim(es6 || erb)
    var val

    if (kindOf(erb) === 'number') index = erb

    // return if prop is undefined
    if (!prop) return

    // if prop is a function try and execute it. This is a hack!!
    // Not using method from https://github.com/jonschlinkert/expand.
    // this does not cover all cases as with above. But then again,
    // I have no to little use calling functions in this type
    // of situation
    if (/[()]/.test(prop)) {
      var firstparens = prop.indexOf('(')
      var lastparens = prop.indexOf(')')
      var exp = prop.slice(0, firstparens)
      var expResult = prop.slice(firstparens + 1, prop.length -1)
      val = data[exp](data[expResult])
    } else {
      val = data[prop] || get(data, prop)
    }

    if (isPrimitive(val)) {
      if (kindOf(index) !== 'number') index = str.indexOf(match)

      var len = match.length
      if (str.length > len) {
        var head = str.slice(0, index)
        var tail = str.slice(index + len)
        result = head + val + tail
      } else {
        result = val
      }
    } else if (val) {
      // prevent inifinte loops
      if (result === cache.prev) return

      cache.prev = result
      result = resolve(val, data, opts)
    }

    if (typeof result === 'string') result = resolveString(result, data, opts)
  })

  return result
}

function resolveObject (obj, data, opts) {
  Object.keys(obj).forEach(function (key, idx, arr) {
    obj[key] = resolve(obj[key], data, opts)
  })

  return obj
}

function resolveArray (arr, data, opts) {
  var len = arr.length
  var i = - 1

  while (++i < len) {
    arr[i] = resolve(arr[i], data, opts)
  }

  return arr
}

function trim (str) {
  return str == null ? '' : String(str).trim()
}

module.exports = expand
