var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/deepMatches')
var t = painless.assert

var deepMatches = require('../../../src/object/deepMatches')

test('should match objects', function () {
  var obj = {a: 1, b: 'b', c: null}
  t.same(deepMatches(obj, {a: 1}), true)
  t.same(deepMatches(obj, {b: 'b'}), true)
  t.same(deepMatches(obj, {c: null}), true)
  t.same(deepMatches(obj, {a: 1, b: 'b', c: null}), true)
})

test('should not match objects with different values', function () {
  var obj = {a: 1, b: 'b', c: null}
  t.same(deepMatches(obj, {a: 2}), false)
  t.same(deepMatches(obj, {b: 'a'}), false)
  t.same(deepMatches(obj, {c: 'c'}), false)
})

test('should use strict comparison for values', function () {
  var obj = {a: 1, b: null}
  t.same(deepMatches(obj, {a: '1'}), false)
  t.same(deepMatches(obj, {b: undefined}), false)
})

test('should recursively match objects', function () {
  var obj = {a: {b: 1, c: 'c'}}
  t.same(deepMatches(obj, {a: {b: 1}}), true)
  t.same(deepMatches(obj, {a: {c: 'c'}}), true)
  t.same(deepMatches(obj, {a: {b: 2}}), false)
})

test('should match arrays', function () {
  var arr = [1, 2, 'a', 'b']
  t.same(deepMatches(arr, [1, 2]), true)
  t.same(deepMatches(arr, [2, 'b']), true)
  t.same(deepMatches(arr, [3]), false)
  t.same(deepMatches(arr, ['a', 3]), false)
})

test('should match arrays regardless of value order', function () {
  var arr = [1, 2, 'a', 'b']
  t.same(deepMatches(arr, ['a', 1]), true)
})

test('should recursively match arrays and objects', function () {
  var obj = {a: [1, {b: 2, c: ['a', 'b', 'c']}]}
  t.same(deepMatches(obj, {a: [1]}), true)
  t.same(deepMatches(obj, {a: [{b: 2}]}), true)
  t.same(deepMatches(obj, {a: [{c: ['b', 'c']}]}), true)
  t.same(deepMatches(obj, {a: [{c: ['b', 'd']}]}), false)
})

test('should not duck-type arrays', function () {
  var obj = {a: [0, 2, 3]}
  t.same(deepMatches(obj, {a: {length: 1, '0': 0}}), false)
})

test('should match array properties with object', function () {
  var obj = {a: [1, 2]}
  t.same(deepMatches(obj, {a: {length: 2}}), true)
})
