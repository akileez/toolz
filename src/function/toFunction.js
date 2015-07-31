var kindOf = require('../lang/kindOf')

// https://github.com/component/to-functon

function toFuncton (obj) {
  switch (kindOf(obj)) {
    case 'object'  : return objectToFunc(obj)
    case 'funtion' : return obj
    case 'string'  : return stringToFunc(obj)
    case 'regexp'  : return regexpToFunc(obj)
    default        : return defaultToFunc(obj)
  }
}

// default to strict equality
function defaultToFunc (val) {
  return function (obj) {
    return val === obj
  }
}

// Convert `re` to a function.
function regexpToFunc (re) {
  return function (obj) {
    return re.test(obj)
  }
}

// Convert property `str` to a function.
function stringToFunc (str) {
  // immediate such as "> 20"
  if (/^ *\W+/.test(str)) return new Function('_', 'return _ ' + str)

  // properties such as "name.first" or "age > 18" or "age > 18 && age < 36"
  return new Function('_', 'return ' + get(str))
}

// Convert `object` to a function.
function objectToFunc (obj) {
  var match = {}

  for (var key in obj) {
    match[key] = typeof obj[key] === 'string'
      ? defaultToFunc(obj[key])
      : toFuncton(obj[key])
  }
  return function (val) {
    if (typeof val !== 'object') return false
    for (var key in match) {
      if (!(key in val)) return false
      if (!match[key](val[key])) return false
    }
    return true
  }
}

// Build the getter function. Supports getter style functions
function get (str) {
  var props = expr(str)
  if (!props.length) return '_.' + str

  var i = -1
  var len = props.length
  var prop
  var val

  while (++i < len) {
    prop = props[i]
    val = '_.' + prop
    val = "('function' == typeof " + val + " ? " + val + "() : " + val + ")"

    // mimic negative lookbehind to avoid problems with nested properties
    str = stripNested(prop, str, val)
  }
  return str
}

// Mimic  negative lookbehind to avoid problems with nested properties.
// See: http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript

function stripNested (prop, str, val) {
  return str.replace(new RegExp('(\\.)?' + prop, 'g'), function ($0, $1) {
    return $1 ? $0 : val
  })
}

// https://github.com/component/props

// Global Names
var globals = /\b(this|Array|Date|Object|Math|JSON)\b/g

// Return immediate identifiers parsed from `str`.
function expr (str, fn){
  var p = unique(props(str))
  if (fn && 'string' == typeof fn) fn = prefixed(fn)
  if (fn) return map(str, p, fn)
  return p
}

// Return immediate identifiers in `str`.
function props(str) {
  return str
    .replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
    .replace(globals, '')
    .match(/[$a-zA-Z_]\w*/g)
    || []
}

// Return `str` with `props` mapped with `fn`.
function map(str, props, fn) {
  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g
  return str.replace(re, function(_){
    if ('(' == _[_.length - 1]) return fn(_)
    if (!~props.indexOf(_)) return _
    return fn(_)
  })
}

// Return unique array.
function unique(arr) {
  var ret = []

  for (var i = 0; i < arr.length; i++) {
    if (~ret.indexOf(arr[i])) continue
    ret.push(arr[i])
  }

  return ret
}

// Map with prefix `str`.
function prefixed(str) {
  return function(_){
    return str + _
  }
}

module.exports = toFuncton
