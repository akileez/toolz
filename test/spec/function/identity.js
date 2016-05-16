'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/identity')
var t = painless.assert

var identity = require('../../../src/function/identity')

test('should return first argument provided to it', function () {
  t.is(identity(1, 2, 3), 1)
  t.is(identity(3), 3)
  t.is(identity(null), null)
  t.is(identity(), undefined)
  var obj = {}
  t.is(identity(obj), obj)
})
