var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/yoda')
var t = painless.assert

var yoda = require('../../../src/lang/yoda')

var a = function () {}
var b = function () {}
var c = function () {}
var d = true

test('test yoda.and', function () {
  var res = yoda.and('function', typeof a, typeof b, typeof c)
  t.is(res, true)
})

test('test yoda.not', function () {
  var res = yoda.not('function', typeof a, typeof b, typeof c)
  t.is(res, false)
})

test('test yoda.or', function () {
  var res = yoda.or('function', typeof a, typeof b, typeof c)
  t.is(res, true)
})

test('test yoda.is', function () {
  var res = yoda.is('function', a)
  var rez = yoda.is('function', d)
  t.is(res, true)
  t.is(rez, false)
})

test('test yoda.isnt', function () {
  var res = yoda.isnt('function', a)
  var rez = yoda.isnt('function', d)
  t.is(res, false)
  t.is(rez, true)
})

test('test yoda.empty', function () {
  var arr1 = []
  var arr2 = []
  var arr3 = [1,2]

  t.is(yoda.empty(arr1, arr2, arr3), false)
})