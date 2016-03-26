var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/kindOf')
var t = painless.assert

var kindOf = require('../../../src/lang/kindOf')

test('should get the kind of value', function () {
  t.eq(kindOf(''), 'string')
  t.eq(kindOf('foo'), 'string')
  t.eq(kindOf(new String('lorem')), 'string')
  t.eq(kindOf(String(123)), 'string')

  t.eq(kindOf(0), 'number')
  t.eq(kindOf(123), 'number')
  t.eq(kindOf(new Number(123)), 'number')
  t.eq(kindOf(Number('123')), 'number')

  t.eq(kindOf(true), 'boolean')
  t.eq(kindOf(false), 'boolean')
  t.eq(kindOf(new Boolean(false)), 'boolean')
  t.eq(kindOf(new Boolean(true)), 'boolean')
  t.eq(kindOf(Boolean(0)), 'boolean')
  t.eq(kindOf(Boolean(1)), 'boolean')

  t.eq(kindOf([1, 'foo']), 'array')
  t.eq(kindOf(new Array(3)), 'array')

  t.eq(kindOf(function () {}), 'function')
  t.eq(kindOf(new Function('return 1;')), 'function')

  t.eq(kindOf(/\w+/), 'regexp')
  t.eq(kindOf(new RegExp('\\w+', 'g')), 'regexp')

  t.eq(kindOf(new Date()), 'date')


  t.eq(kindOf(null), 'null')

  t.eq(kindOf(undefined), 'undefined')
  t.eq(kindOf(), 'undefined')
})
