var kindOf = require('../lang/kindOf')

// https://github.com/component/to-functon
// Convert property access strings to a function ("user.name.first" etc)

/*

    var toFunction = require('to-function');

    var fn = toFunction('name.first');
    var user = { name: { first: 'Tobi' }};
    fn(user);
    // => "Tobi"

    var _ = require('..');

    // Dot Access
    var users = [
      { name: { first: 'Tobi' }},
      { name: { first: 'Loki' }},
      { name: { first: 'Jane' }},
      { name: { first: 'Manny' }}
    ];

    var short = users.map(_('name.first'));
    console.log(short);
    // => [ 'Tobi', 'Loki', 'Jane', 'Manny' ]

    // Equality
    var tobi = { name: { first: 'Tobi' }, age: 2 };
    var loki = { name: { first: 'Loki' }, age: 2 };
    var jane = { name: { first: 'Jane' }, age: 6 };

    var users = [tobi, loki, jane];

    var user = users.filter(_(loki)).pop();
    console.log(user);
    // => { name: { first: 'Loki' }, age: 2 }

    // Expressions
    var users = [
      { name: { first: 'Tobi' }, age: 2 },
      { name: { first: 'Loki' }, age: 2 },
      { name: { first: 'Jane' }, age: 6 }
    ];

    var oldPets = users.filter(_('age > 2 && age < 10'));
    console.log(oldPets);
    // => [ { name: { first: 'Jane' }, age: 6 } ]

    // Regular Expressions
    var users = [
      'Tobi',
      'Loki',
      'Jane'
    ];

    var t = users.filter(_(/^T/));

    console.log(t);
    // => [ 'Tobi' ]

    // Nesting
    var users = [
      { name: { first: 'Tobi', last: 'Ferret' }, age: 2 },
      { name: { first: 'Loki', last: 'Ferret' }, age: 2 },
      { name: { first: 'Luna', last: 'Cat' }, age: 2 },
      { name: { first: 'Manny', last: 'Cat' }, age: 3 }
    ];

    // single-key

    var query = _({
      name: {
        last: 'Cat'
      }
    });

    console.log(users.filter(query));
    // => [ { name: { first: 'Luna', last: 'Cat' }, age: 2 },
    //      { name: { first: 'Manny', last: 'Cat' }, age: 3 } ]

    // multi-key

    var query = _({
      name: {
        first: /^L/,
        last: 'Cat'
      }
    });

    console.log(users.filter(query));
    // => [ { name: { first: 'Luna', last: 'Cat' }, age: 2 } ]

    // multi-level

    var query = _({
      name: { last: 'Cat' },
      age: 3
    });

    console.log(users.filter(query));
    // => [ { name: { first: 'Manny', last: 'Cat' }, age: 3 } ]

*/

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
