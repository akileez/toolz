var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/compact and array/compactor')
var t = painless.assert
var compact = require('../../../src/array/compact')
var compactor = require('../../../src/array/compactor')

test('compact to remove null and undefined items', function () {
  var arr = [1, 2, null, false, '', 'foo', undefined]
  arr[10] = 'bar'

  t.is(compact(arr).length, 6)
  t.same(compact(arr), [1, 2, false, '', 'foo', 'bar'])

  t.is(compactor(arr).length, 4)
  t.same(compactor(arr), [1, 2, 'foo', 'bar'])
})

test('return empty array if source array is null/undefined', function () {
  t.same(compact(null), [])
  t.same(compact(undefined), [])

  t.same(compactor(null), [])
  t.same(compactor(undefined), [])
})
