var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/where')
var t = painless.assert

var where = require('../../../src/array/where')

var f = {
  arr: [ 1, 1, 2, 3, 4 ],
  records: [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ]
}

test('.where(records, query)', function () {
  t.same(where(f.records, { b: true }), [])
  t.same(where(f.records, { b: false }), [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ])
  t.same(where(f.records, { b: false, n: 3 }), [])
  t.same(where(f.records, { b: false, n: 2 }), [
    { b: false, n: 2 }
  ])
})

test('.where(records, regex)', function () {
  t.same(where(f.records, { n: /1/ }), [ { b: false, n: 1 } ])
  t.same(where(f.records, { x: undefined, n: /.+/ }), [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ])
})

test('.where(array, primitive)', function () {
  t.same(where(f.arr, 1), [ 1, 1 ])
  t.same(where(f.arr, 2), [ 2 ])
})

test('.where(array, regex)', function () {
  t.same(where(f.arr, /1/), [ 1, 1 ])
  t.same(where(f.arr, /2/), [ 2 ])
})

test('.where(array, function)', function () {
  function over3 (val) { return val > 3; }
  t.same(where(f.arr, over3), [ 4 ])
})

test('.where(array, array)', function () {
  function over3 (val) { return val > 3; }
  t.same(where(f.arr, [ 1, /2/, over3 ]), [ 1, 1, 2, 4 ])
})

test('.where(array, object[])', function () {
  t.same(where(f.records, [ { n: 1 }, { n: 2 }, { n: 3 } ]), [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ])
})

test('.where deep query', function () {
  var arr = [
    { one: { number: 1, letter: 'a' } },
    { one: { number: 2, letter: 'b' } },
    { one: { number: 3, letter: 'b' } }
  ]
  t.same(where(arr, { one: { letter: 'b' } }), [
    { one: { number: 2, letter: 'b' } },
    { one: { number: 3, letter: 'b' } }
  ])
  t.same(where(arr, { one: { number: 2, letter: 'b' } }), [
    { one: { number: 2, letter: 'b' } }
  ])
  t.same(where(arr, { one: { number: 1, letter: 'a' } }), [
    { one: { number: 1, letter: 'a' } }
  ])
})