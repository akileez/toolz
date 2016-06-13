var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/sample')
var t = painless.assert

var sample = require('../../../src/random/sample')

test('test one', function () {
  var rand = sample(1, 10, 12, true)
  var rand2 = sample(1, 10, 12, false) // does matter which Boolean is used

  t.is(rand.length, 12)
  t.diff(rand, rand2)
  console.log(rand, rand2)
})

test('test two', function () {
  var rand = sample(1, 46, 6, 4)
  var rand2 = sample(1, 46, 6, 4)

  t.is(rand.length, 6)
  t.diff(rand, rand2)
  console.log(rand, rand2)
})

test('test three', function () {
  var rand = sample(1, 10, 5)
  var rand2 = sample(1, 10, 5)

  t.is(rand.length, 5)
  t.diff(rand, rand2)
  console.log(rand, rand2)
})

test('should throw if first three arguments are not numbers', function () {
  t.throws(() => {sample('a', 'b', 'c')})
  t.throws(() => {sample(1, 'b', 'c')})
  t.throws(() => {sample(1, 10, 'c')})
  t.doesNotThrow(() => {sample(1, 10, 3)})
})