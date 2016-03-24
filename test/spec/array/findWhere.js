var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/findWhere')
var t = painless.assert

var findWhere = require('../../../src/array/findWhere')

test('findWhere', function () {
  var arr = [
    { result: false, number: 1 },
    { result: false, number: 2 }
  ]
  t.same(findWhere(arr, { result: true }), undefined)
  t.same(findWhere(arr, { result: false }), { result: false, number: 1 })
  t.same(findWhere(arr, { result: false, number: 3 }), undefined)
  t.same(findWhere(arr, { result: false, number: 2 }), { result: false, number: 2 })
})

test('.findWhere deep query', function () {
  var arr = [
    { one: { number: 1, letter: 'a' } },
    { one: { number: 2, letter: 'b' } }
  ]
  t.same(findWhere(arr, { one: { number: 1 } }), { one: { number: 1, letter: 'a' } })
  t.same(findWhere(arr, { one: { number: 2 } }), { one: { number: 2, letter: 'b' } })
  t.same(findWhere(arr, { one: { letter: 'b' } }), { one: { number: 2, letter: 'b' } })
  t.same(findWhere(arr, { one: { number: 3 } }), undefined)
})

test('.findWhere deeper query', function () {
  var query
  var arr = [
    {
      name: 'one',
      data: { two: { three: 'four' } }
    },
    {
      name: 'two',
      data: { two: { three: 'five' } }
    }
  ]
  query = {  name: 'one', data: { two: { three: 'four' } } }
  t.same(findWhere(arr, query), {
    name: 'one',
    data: { two: { three: 'four' } }
  })
  query = {  name: 'one' }
  t.same(findWhere(arr, query), {
    name: 'one',
    data: { two: { three: 'four' } }
  })
  query = {  name: 'two' }
  t.same(findWhere(arr, query), {
    name: 'two',
    data: { two: { three: 'five' } }
  })

  query = {  name: 'two', data: { two: { three: 'four' } } }
  t.same(findWhere(arr, query), undefined)

  query = {  name: 'two', data: { two: { three: 'five' } } }
  t.same(findWhere(arr, query), {
    name: 'two',
    data: { two: { three: 'five' } }
  })

})