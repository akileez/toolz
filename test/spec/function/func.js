'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/func')
var t = painless.assert

var func = require('../../../src/function/func')

test('should call method of object', function () {
  var o = {
    getFoo: function () {
      return 'bar'
    }
  }

  var getFoo = func('getFoo')
  t.is(getFoo(o), 'bar')
})
