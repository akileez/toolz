'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/prop')
var t = painless.assert

var prop = require('../../../src/function/prop')

test('should grab property from object', function () {

  var o = {foo : 'bar'};
  var getFoo = prop('foo');

  t.is(getFoo(o), 'bar')

});
