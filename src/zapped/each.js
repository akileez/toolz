// var kindOf = require('../lang/kindOf')
// var toFunction = require('../function/toFunction')
var hasOwn = require('../object/hasOwn')
var make = require('./_make')

// component/each

// function each (obj, fn, ctx) {
//   fn = toFunction(fn)
//   ctx = ctx || this

//   switch (kindOf(obj)) {
//     case 'array' : return array(obj, fn, ctx)
//     case 'object' : return object(obj, fn, ctx)
//     case 'string' : return string(obj, fn, ctx)
//   }
// }

function string (obj, fn, ctx) {
  var i = -1
  var len = obj.length

  while (++i < len) {
    fn.call(ctx, obj.charAt(i), i)
  }
}

function object (obj, fn, ctx) {
  var key
  for (key in obj) {
    if (hasOwn(obj, key)) fn.call(ctx, key, obj[key])
  }
}

function array (obj, fn, ctx) {
  var i = -1
  var len = obj.length

  while (++i < len) {
    fn.call(ctx, obj[i], i)
  }
}

module.exports = make(array, object, string)
