var test = require('../../src/assertion/ttr')
var compact = require('../../src/array/compact')
var compactor = require('../../src/array/compactor')

test.log('Testing array/compact and array/compactor\n')

test('compact to remove null and undefined items', function (t) {
  var arr = [1, 2, null, false, '', 'foo', undefined]
  arr[10] = 'bar'

  t.is(compact(arr).length, 6)
  t.same(compact(arr), [1, 2, false, '', 'foo', 'bar'])

  t.is(compactor(arr).length, 4)
  t.same(compactor(arr), [1, 2, 'foo', 'bar'])
})

test('return empty array if source array is null/undefined', function (t) {
  t.same(compact(null), [])
  t.same(compact(undefined), [])

  t.same(compactor(null), [])
  t.same(compactor(undefined), [])
})

test.result()
