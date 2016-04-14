// https://github.com/tj/node-thunkify
// (MIT)

var assert = require('assert')

/*
  Turn a regular node function into one which returns a thunk,
  useful for generator-based flow control such as co.

    var thunkify = require('thunkify');
    var fs = require('fs');

    var read = thunkify(fs.readFile);

    read('package.json', 'utf8')(function(err, str){
      // something here
    });

  Wrap a regular callback `fn` as a thunk.
    @param {Function} fn
    @return {Function}
    @api public
*/

function thunkify (fn) {
  assert(typeof fn === 'function', 'function required')

  return function () {
    var args = new Array(arguments.length)
    var ctx = this

    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i]
    }

    return function (done) {
      var called

      args.push(function () {
        if (called) return
        called = true
        done.apply(null, arguments)
      })

      try {
        fn.apply(ctx, args)
      } catch (err) {
        done(err)
      }
    }
  }
}

module.exports = thunkify

