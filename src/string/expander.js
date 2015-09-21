// adopted from: https://github.com/jonschlinkert/expand
// Copyright (c) 2015, Jon Schlinkert (MIT)

var kindOf = require('../lang/kindOf')
var look   = require('../object/look')

// Curried function:
// var expand = require('expand') or require('expand')()
// var fn = expand({regex: /abc/})
// fn('{{a}}', {a: 'apple'}) or expand('{{a}}', {a: 'apple'})

function expand (opts) {
  opts = opts || {}
  var regex = opts.regex || /\{\{([^\}]+)\}\}/

  function resolve (val, data) {
    data = data || val

    switch (kindOf(val)) {
      case 'array'  :
      case 'object' : return resolveObject(val, data)
      case 'string' : return resolveString(val, data)
      default       : return val
    }
  }

  function resolveObject (obj, data) {
    Object.keys(obj).forEach(function (key, idx, arr) {
      obj[key] = resolve(obj[key], data)
    })

    return obj
  }

  function resolveString (str, data) {
    var m

    while ((m = regex.exec(str))) {
      var orig = str
      var prop = (m[1] || m[2] || '').trim()
      var match = m[0]

      if (!match) return str

      var len = match.length
      var i = m.index

      var val = match

      if (/[()]/.test(prop)) {
        val = resolveFunc(prop, data)
      } else {
        val = look(data, prop)
      }

      // if no value was retured from `look` or `resolveFunc`,
      // reset the value to `match`
      if (val == null) val = match

      if (typeof val === 'object') {
        // if the value is an object, recurse to resolve
        // templates in the keys and values of the object
        val = resolve(val, data)
      } else if (typeof val !== 'function') {
        // ensure we have a string. numbers are the most
        // likely thing to blow this up at this point
        val = val.toString()
      }

      if (typeof val === 'function') return val.bind(data)

      // could be an array, object, etc. if so, just
      // break and return the value. we could add one
      // more `resolve` here if there is a reason to
      if (typeof val !== 'string') {
        str = val
        break
      }

      var head = str.slice(0, i)
      var tail = str.slice(i + len)

      str = head + val + tail
      if (str === orig) break
    }

    return str
  }

  function resolveFunc (prop, data) {
    // This is a hack!! this does not cover all cases as with
    // https://github.com/jonschlinkert/expand. But then again,
    // I have no to little use calling functions in this type
    // of situation
    var firstparens = prop.indexOf('(')
    var lastparens = prop.indexOf(')')
    var expr = prop.slice(0, firstparens)
    var exprParam = prop.slice(firstparens + 1, lastparens)

    return typeof data[expr] === 'function'
      ? data[expr](data[exprParam])
      : resolve('{{' + expr + '}}', data)(exprParam)
  }

  return resolve
}

module.exports = expand
