var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/without')
var t = painless.assert

var without = require('../../src/array/without')

var f = {
  num: [ 1, 2, 3, 4 ],
  records: [
    { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }
  ]
}

test('.without does not return the input array', function () {
  var result = without(f.num, 2)
  t.ne(f.num, result)
})

test('.without(array, primitive)', function () {
  t.same(without(f.num, 2), [ 1, 3, 4 ])
})

test('.without(array, regex)', function () {
  t.same(without(f.num, /2/), [ 1, 3, 4 ])
})

test('.without(array, function)', function () {
  function over1 (val) { return val > 1; }
  function under4 (val) { return val < 4; }
  t.same(without(f.num, over1), [ 1 ])
})

test('.without(array, query)', function () {
  t.same(without(f.records, { n: 0}), f.records)
  t.same(without(f.records, { n: 1}), [
    { n: 2 }, { n: 3 }, { n: 4 }
  ])
})

test('.without(array, array)', function () {
  t.same(without(f.num, [ 2, 3 ]), [ 1, 4 ])
})