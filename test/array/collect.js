var test = require('../../src/assertion/ttr')
var collect = require('../../src/array/collect')
var collection = require('../../src/collection/collect')

test.log('Testing array/collect and collection/collect\n')

test('collect [map] items and concat results', function (t) {
  var src = [0, 1, 2, 3]
  var res = collect(src, function (val) {
    var i = 0
    var arr = []

    while (i++ < val) {
      arr.push(val)
    }

    return arr
  })

  t.same(res, [1, 2, 2, 3, 3, 3])
})

test('collect undefined map result', function (t) {
  var src = [1, 2, 3, 4]
  var res = collect(src, function (val) {
    if (val % 2 !== 0) return [val]
  })
  t.same(res, [1, 3])
})

test('loop even if array is sparse', function (t) {
  function toOne () {return [1]}

  var base = new Array(3)
  var res = collect(base, toOne)
  t.same(res, [1, 1, 1])

  base[5] = 'foo'
  res = collect(base, toOne)
  t.same(res, [1, 1, 1, 1, 1, 1])
})

test('return empty array if target is null/undefined', function (t) {
  t.same(collect(null), [])
  t.same(collect(undefined), [])
})

test('allow shorthand syntax', function (t) {
  // uses collection/collect from mout
  var arr = [{ a: [] }, { b: 1 }, { a: [1] }, { a: [2, 3] }]
  t.same(collection(arr, 'a'), [1, 2, 3])
})

test.result()
