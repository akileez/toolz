'use strict'

var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/randItem')
var t = painless.assert

var randItem = require('../../../src/random/randItem')
var stable = require('../../../src/function/stable')

var fix = ['a', 'b', 'c', 'd', 'e']

test('should not be a stable function', function () {
  t.false(stable(() => randItem(fix)))
})

test('should confirm contents from function execution', function () {
  for (var i = 0; i < 1000; i++) {
    t.is(typeof randItem(fix), 'string')
  }
})
