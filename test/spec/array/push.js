var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/push and array/push1')
var t = painless.assert

var push = require('../../src/array/push')
var push1 = require('../../src/array/push1')
var xcat = require('../../src/array/xcat')

test('push something', () => {
  var arr = []
  var str = 'Hello'

  t.is(push(arr, str), 1)
  t.same(arr, ['Hello'])
  t.is(push(arr, 'World'), 2)
  t.same(arr, ['Hello', 'World'])
})

test('push1 something', () => {
  var arr = []
  var str = 'Hello'

  t.is(push1(arr, str), 1)
  t.same(arr, ['Hello'])
  t.is(push1(arr, 'World'), 2)
  t.same(arr, ['Hello', 'World'])
})

test('xcat something', () => {
  var arr = []
  var str = 'Hello'

  t.same(xcat(str), ['Hello'])
  t.same(xcat(str, 'World'), ['Hello', 'World'])
  t.same(xcat(str, null, 'World'), ['Hello', null, 'World'])
})

test('return array length if nothing is pushed', () => {
  var arr = [1, 2]

  t.is(push(arr), 2)
  t.is(push(arr), arr.length)
})

test('return array length if nothing is pushed', () => {
  var arr = [1, 2]

  // undefined will be pushed onto the array creating a
  // sparse array. this is by design.
  t.is(push1(arr), 3)
  t.is(push1(arr), arr.length)
})

test('pass additional arguments to push', () => {
  var arr = [1]

  t.is(push(arr, 2, 3, 4, 5), 5)
  t.same(arr, [1,2,3,4,5])
})