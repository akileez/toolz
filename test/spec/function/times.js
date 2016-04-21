'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/times')
var t = painless.assert

var times = require('../../../src/function/times')

test('should iterate a given amount of times passing the index', function () {
  var amount = 5
  var count = 0

  times(amount, function (i) {
    count += i
  })

  t.is(count,  10)
})

test('should cancel the iteration if returned false', function () {
  var amount = 5
  var count = 0

  times(amount, function (i) {
    count++
    if (count === 2) return false
  })

  t.is(count,  2)
})

test('should execute callback in context', function () {
  var amount = 5
  var object = {
    count: 0
  }

  times(amount, function (i) {
    this.count++
  }, object)

  t.is(object.count,  5)
})
