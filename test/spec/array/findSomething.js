var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/findSomething')
var t = painless.assert

var pick = require('../../../src/array/findSomething')

var f = {
  recordset: [
    { one: 'un', two: 'deux', three: 'trois' },
    { two: 'two', one: 'one' },
    { four: 'quattro' },
    { two: 'zwei' }
  ],
  deep: [
    { one: { one: 1, two: 2 }},
    { one: { one: 1, two: 2 }}
  ]
}

test('.pick(recordset, property)', function () {
  t.same(pick(f.recordset, 'one'), [
    { one: 'un' },
    { one: 'one' }
  ])
})

test('.pick(recordset, [ properties ])', function () {
  t.same(pick(f.recordset, [ 'one', 'two' ]), [
    { one: 'un', two: 'deux' },
    { two: 'two', one: 'one' },
    { two: 'zwei' },
  ])
})

test('.pick(recordset, property.property)', function () {
  t.same(pick(f.deep, 'one.two'), [
    { two: 2 },
    { two: 2 },
  ])
})