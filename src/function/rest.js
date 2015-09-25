// creates a function that invokes 'func' with the 'this' binding of the
// created function and arguments from 'strt' and beyond provided as an array.

// NOTE: This method is based on the [rest paramter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

// var say = rest(function(what, names) {
//   return what + ' ' + _.initial(names).join(', ') +
//     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
// });
//
// say('hello', 'fred', 'barney', 'pebbles');
// => 'hello fred, barney, & pebbles'

function rest (func, strt) {
  if (typeof func != 'function') throw new TypeError('Expected a function')

  strt = Math.max(strt === undefined ? (func.length - 1) : (+strt || 0), 0)
  return function () {
    var args = arguments
    var idx = -1
    var len = Math.max(args.length - strt, 0)
    var params = Array(len)

    while (++idx < len) {
      params[idx] = args[strt + idx]
    }
    switch (strt) {
      case 0: return func.call(this, params)
      case 1: return func.call(this, args[0], params)
      case 2: return func.call(this, args[0], args[1], params)
    }
    var otherArgs = Array(strt + 1)
    idx = -1
    while (++idx < strt) {
      otherArgs[idx] = args[idx]
    }
    otherArgs[strt] = params
    return func.apply(this, otherArgs)
  }
}

module.exports = rest
