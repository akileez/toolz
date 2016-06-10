'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/noop')
var t = painless.assert

var noop = require('../../../src/function/noop')

test('should do nothing', () => {
  t.is(noop(), undefined)
  t.is(noop('foo'), undefined)
})