var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/findIndex')
var t = painless.assert

var findIndex = require('../../src/array/findIndex')
var fidx = require('../../src/collection/findIndex')


test('should return index of first match', function () {
  var items = [1, { a: 1 }, 1, 'foo', 'bar', { a: 1 }]

  var findOne = function (val) {
      return val === 1
    }
  var isString = function (val) {
      return typeof val === 'string'
    }
  var findObj = function (val) {
      return val.a === 1
    }

  t.same(findIndex(items, findOne), 0)
  t.same(findIndex(items, isString), 3)
  t.same(findIndex(items, findObj), 1)

  t.same(fidx(items, findOne), 0)
  t.same(fidx(items, isString), 3)
  t.same(fidx(items, findObj), 1)
})

test('should support object shortcut syntax', function () {
  var items = [1, { a: 1 }, 1, 'foo', 'bar', { a: 1 }]
  t.same(fidx(items, { a: 1 }), 1)
})

test('should support string shortcut syntax', function () {
  var items = [1, { a: 1 }, 1, 'foo', 'bar', { a: 1 }]
  t.same(fidx(items, 'a'), 1)
})

test('should return -1 when not found', function () {
  var items = [1, { a: 1 }, 1, 'foo', 'bar', { a: 1 }]

  var findTwo = function (val) {
    return val === 2;
  }

  t.same(findIndex(items, findTwo), -1)
  t.same(fidx(items, findTwo), -1)

})

test('should return -1 when array is null/undefined', function () {
  var testFunc = function () {
    return true
  }

  t.is(findIndex(null, testFunc), -1)
  t.is(findIndex(undefined, testFunc), -1)

  t.is(fidx(null, testFunc), -1)
  t.is(fidx(undefined, testFunc), -1)
})
