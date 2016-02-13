// https://github.com/tj/node-thunkify
// (MIT)

/**
 * Module dependencies.
 */

var assert = require('assert');

/**
 * Expose `thunkify()`.
 */

module.exports = thunkify;

/**
 * Wrap a regular callback `fn` as a thunk.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

/*

Turn a regular node function into one which returns a thunk, useful for generator-based flow control such as co.

    var thunkify = require('thunkify');
    var fs = require('fs');

    var read = thunkify(fs.readFile);

    read('package.json', 'utf8')(function(err, str){

    });

*/

function thunkify(fn){
  assert('function' == typeof fn, 'function required');

  return function(){
    var args = new Array(arguments.length);
    var ctx = this;

    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function(done){
      var called;

      args.push(function(){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
