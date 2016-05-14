'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/series')
var t = painless.assert

var series = require('../../../src/function/series')
var contains = require('../../../src/array/contains')

test('should execute a list of functions in series', function () {

  var arr = [4, 2, 1, 5];

  var a = [];
  var b = [];
  var c = [];

  function forEach(arr, fn) {
    var n = arr.length;
    var i = 0;
    while (i < n) {
      fn(arr[i]);
      i += 1;
    }
  }

  function fn1(val){
    a.push(val);
    t.false(contains(b, val ))
    t.false(contains(c, val))
  }

  function fn2(val){
    b.push(val);
    t.true(contains(a, val ))
    t.false(contains(c, val))
  }

  function fn3(val){
    c.push(val);
    t.true(contains(a, val ))
    t.true(contains(b, val))
  }

  forEach(arr, series(fn1, fn2, fn3));

  t.same( a, arr )
  t.same( b, arr )
  t.same( c, arr )

});