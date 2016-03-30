var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/extend')

var t = painless.assert

var extend = require('../../../src/object/extend')

var a1, a2, a3, a4,
  a1_4,
  b1, b2,
  b1_2

test.beforeEach(function () {
  a1 = {a: 0, b: 1, c: 2}
  a2 = {d: 3, e: 4}
  a3 = {f: 5}
  a4 = {g: 6}
  a1_4 = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6}

  b1 = {a: 1, b: 2, c: 3}
  b2 = {b: 4, d: 8}
  b1_2 = {a: 1, b: 4, c: 3, d: 8}
})

test('should combine objects properties and modify original object', function () {
  extend(a1, a2, a3, a4)
  t.same(a1, a1_4)

  var r = extend(b1, b2)
  t.same(r, b1_2)
  t.same(r, b1)
})

test('should work with empty objects', function () {
  t.same(extend({}, b1, b2, {}), b1_2)
})

test('should ignore null/undefined values', function () {
  t.same(extend(b1, null, undefined, b2), b1_2)
})

test('should fix dont enum bug on IE', function () {
  var r = extend({
    hasOwnProperty: 'foo'
  }, {
    a: 1,
    b: 2,
    toString: 'dolor',
    hasOwnProperty: 'bar'
  })
  t.is(r.hasOwnProperty, 'bar')
  t.is(r.toString, 'dolor')
  t.is(r.a, 1)
  t.is(r.b, 2)
})
