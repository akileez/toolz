var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/take')
var t = painless.assert
var take = require('../../src/array/take')

test('should iterate a given amount of times passing the index and total', function () {
  var amount = 5
  var count = 0
  take(amount, function (i, total) {
    count += i
    t.is(total, amount)
    return count
  })
  t.is(count, 10)
})

test('should collect the results of the callback', function () {
  var amount = 5
  var vals = take(amount, function (i, total) {
    return i / total
  })
  t.is(vals.length, amount)
  for (var i = 0; i < amount; i++) {
    t.is(vals[i], i / amount)
  }
})

test('should execute callback in context', function () {
  var object = {
    phrase: 'hello world'
  }
  var vals = take(object.phrase.length, function (i) {
    return this.phrase[i]
  }, object)
  t.is(vals.length, object.phrase.length)
  for (var i = 0; i < object.phrase.length; i++) {
    t.is(vals[i], object.phrase[i])
  }
})
